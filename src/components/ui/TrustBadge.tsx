import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-sans text-eve-teal",
        className,
      )}
      style={{ fontSize: "11px" }}
    >
      <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
      Vetted by Eve &amp; Eden
    </span>
  );
}
