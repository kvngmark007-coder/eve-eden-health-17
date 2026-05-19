import { cn } from "@/lib/utils";

interface StageRingProps {
  week: number;
  total?: number;
  size?: number;
  className?: string;
}

export function StageRing({
  week,
  total = 40,
  size = 120,
  className,
}: StageRingProps) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(week / total, 0), 1);
  const offset = circumference * (1 - progress);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-eve-teal-light"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-eve-teal"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-serif text-eve-teal-dark leading-none"
          style={{ fontSize: size * 0.32 }}
        >
          {week}
        </span>
        <span className="mt-1 font-sans text-[10px] uppercase tracking-widest text-eve-muted">
          Week / {total}
        </span>
      </div>
    </div>
  );
}
