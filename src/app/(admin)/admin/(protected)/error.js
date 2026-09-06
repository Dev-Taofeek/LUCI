"use client";

export default function AdminError({ error, reset }) {
  return (
    <div className="bg-white border border-border-light rounded-card p-10 text-center">
      <p className="font-semibold">Something went wrong</p>
      <p className="text-sm text-muted mt-1">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center justify-center rounded-control bg-maroon-deep px-5 py-2.5 text-sm font-semibold text-white hover:bg-maroon-dark"
      >
        Try again
      </button>
    </div>
  );
}