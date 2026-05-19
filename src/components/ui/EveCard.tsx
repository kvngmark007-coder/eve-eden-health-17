import * as React from "react";
import { cn } from "@/lib/utils";

export const EveCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-eve-muted/20 bg-eve-cream p-4",
      className,
    )}
    {...props}
  />
));
EveCard.displayName = "EveCard";
