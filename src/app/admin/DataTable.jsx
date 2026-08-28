export default function DataTable({ columns, rows, emptyMessage = "No records yet." }) {
  return (
    <div className="bg-white border border-border-light rounded-[12px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-border-light bg-warm-white">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 sm:px-6 py-3 text-xs font-semibold text-muted btn-tracking uppercase whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 sm:px-6 py-8 sm:py-10 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr
                key={row.id || i}
                className="border-b border-border-light/60 last:border-0 hover:bg-warm-white/60"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-charcoal">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}