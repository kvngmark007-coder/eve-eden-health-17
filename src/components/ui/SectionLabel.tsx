import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans uppercase tracking-widest text-eve-muted",
        className,
      )}
      style={{ fontSize: "10px" }}
      {...props}
    >
      {children}
    </p>
  );
}
