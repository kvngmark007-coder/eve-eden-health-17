import * as React from "react";
import { cn } from "@/lib/utils";

export const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full border border-eve-teal bg-white px-6 py-3 font-sans font-medium text-eve-teal transition-all hover:bg-eve-teal-light active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
      className,
    )}
    {...props}
  />
));
SecondaryButton.displayName = "SecondaryButton";
