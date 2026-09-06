import { LoaderCircle } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex items-center gap-3 text-muted">
        <LoaderCircle size={20} className="animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  );
}