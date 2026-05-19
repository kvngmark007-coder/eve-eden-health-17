import * as React from "react";
import { cn } from "@/lib/utils";

export const GuidanceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-r-xl border-l-[3px] border-eve-terra bg-white p-3 pl-4",
      className,
    )}
    {...props}
  />
));
GuidanceCard.displayName = "GuidanceCard";
