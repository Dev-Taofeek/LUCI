"use client";

import { cn } from "@/lib/utils";

export default function DataTable({ columns, rows, emptyMessage = "No records yet.", onRowClick }) {
  if (rows.length === 0) {
    return (
      <div className="bg-white border border-border-light rounded-card p-8 text-center">
        <p className="text-sm text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border-light rounded-card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-warm-white text-xs text-muted tracking-[0.05em] uppercase">
            {columns.map((col) => (
              <th key={col.key} className="px-4 sm:px-6 py-3 font-semibold whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-t border-border-light/80 transition-colors",
                onRowClick ? "cursor-pointer hover:bg-warm-white/60" : "hover:bg-warm-white/60"
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 sm:px-6 py-4 align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}