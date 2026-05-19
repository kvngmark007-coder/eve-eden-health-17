import * as React from "react";
import { cn } from "@/lib/utils";

export const AICard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl bg-eve-rose p-3 text-white", className)}
    {...props}
  />
));
AICard.displayName = "AICard";
