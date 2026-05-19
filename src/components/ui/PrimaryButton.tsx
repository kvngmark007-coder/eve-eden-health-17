import * as React from "react";
import { cn } from "@/lib/utils";

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full bg-eve-teal px-6 py-3 font-sans font-medium text-white transition-all hover:bg-eve-teal-dark active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
      className,
    )}
    {...props}
  />
));
PrimaryButton.displayName = "PrimaryButton";
