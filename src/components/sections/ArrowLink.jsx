import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArrowLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-maroon-deep btn-tracking border-b border-maroon-deep pb-1 w-fit hover:text-maroon-dark hover:border-maroon-dark"
    >
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}