// Local development PostgreSQL manager (embedded Postgres binaries).
// Usage:
//   node scripts/dev-db.mjs start    # init if needed, start, ensure `luci` db exists
//   node scripts/dev-db.mjs status   # show server status
//   node scripts/dev-db.mjs stop     # stop the server
//   node scripts/dev-db.mjs reset    # stop + wipe data + start fresh
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BIN_DIR = path.join(
  ROOT,
  "node_modules",
  "@embedded-postgres",
  "windows-x64",
  "native",
  "bin"
);
const PGDATA = path.join(ROOT, ".pgdata");
const LOG_FILE = path.join(ROOT, "pg.log");

const HOST = process.env.LUCI_DB_HOST || "127.0.0.1";
const PORT = process.env.LUCI_DB_PORT || "5432";
const USER = process.env.LUCI_DB_USER || "postgres";
const PASSWORD = process.env.LUCI_DB_PASSWORD || "postgres";
const DB = process.env.LUCI_DB_NAME || "luci";

export const DATABASE_URL = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

const bin = (name) => path.join(BIN_DIR, name);

function run(exe, args, options = {}) {
  const res = spawnSync(bin(exe), args, {
    stdio: "inherit",
    ...options,
  });
  if (res.error) throw res.error;
  return res.status;
}

function isRunning() {
  const res = spawnSync(bin("pg_ctl.exe"), ["status", "-D", PGDATA], { stdio: "ignore" });
  return res.status === 0;
}

function currentDb() {
  const res = spawnSync(
    bin("postgres.exe"),
    ["--version"],
    { stdio: "pipe", encoding: "utf8" }
  );
  return (res.stdout || "").trim();
}

async function ensureDatabase() {
  const adminUrl = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/postgres`;
  const client = new pg.Client({ connectionString: adminUrl, connectionTimeoutMillis: 10000 });
  try {
    await client.connect();
    const { rows } = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB]
    );
    if (rows.length === 0) {
      await client.query(`CREATE DATABASE "${DB}"`);
      console.log(`Created database "${DB}".`);
    } else {
      console.log(`Database "${DB}" already exists.`);
    }
  } finally {
    await client.end();
  }
}

async function init() {
  if (existsSync(path.join(PGDATA, "PG_VERSION"))) {
    console.log("Data directory already initialised.");
    return;
  }
  console.log(`Initialising data directory (${currentDb()}) ...`);
  mkdirSync(PGDATA, { recursive: true });
  const pwFile = path.join(tmpdir(), `.luci-pgpw-${process.pid}.txt`);
  writeFileSync(pwFile, PASSWORD);
  try {
    const status = run(
      "initdb.exe",
      [
        "-D", PGDATA,
        "-U", USER,
        "-E", "UTF8",
        "-A", "scram-sha-256",
        "--pwfile", pwFile,
      ],
      { stdio: "inherit" }
    );
    if (status !== 0) {
      console.error("initdb failed.");
      process.exit(status);
    }
  } finally {
    try { rmSync(pwFile, { force: true }); } catch {}
  }
}

async function start() {
  await init();
  if (isRunning()) {
    console.log("Postgres is already running.");
    return ensureDatabase();
  }
  console.log(`Starting Postgres on ${HOST}:${PORT} (data: ${PGDATA}) ...`);
  const status = run(
    "pg_ctl.exe",
    [
      "start",
      "-D", PGDATA,
      "-l", LOG_FILE,
      "-w",
      "-o", `-p ${PORT} -h ${HOST}`,
    ],
    { stdio: "inherit" }
  );
  if (status !== 0) {
    console.error("pg_ctl start failed.");
    process.exit(status);
  }
  await ensureDatabase();
  console.log(`\nPostgres is up. DATABASE_URL=${DATABASE_URL}`);
}

function stop() {
  if (!isRunning()) {
    console.log("Postgres is not running.");
    return;
  }
  console.log("Stopping Postgres ...");
  run("pg_ctl.exe", ["stop", "-D", PGDATA, "-m", "fast"], { stdio: "inherit" });
}

async function status() {
  console.log(run("pg_ctl.exe", ["status", "-D", PGDATA], { stdio: "inherit" }) === 0
    ? "Postgres: running"
    : "Postgres: stopped");
}

function reset() {
  if (isRunning()) stop();
  rmSync(PGDATA, { recursive: true, force: true });
  start();
}

const command = process.argv[2] || "start";
const commands = {
  start,
  stop,
  status,
  reset,
  init,
};

if (commands[command]) {
  commands[command]().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}