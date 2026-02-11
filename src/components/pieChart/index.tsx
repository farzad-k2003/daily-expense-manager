import { useMemo, useState } from "react";
import "./style.css";

type Slice = {
  label: string;
  value: number;
  color: string;
};

type ComputedSlice = Slice & {
  startAngle: number;
  sliceAngle: number;
};

export function PieChart({
  data,
  size = 260,
}: {
  data: Slice[];
  size?: number;
}) {
  const [active, setActive] = useState<number | null>(null);

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  const radius = size / 2;
  const center = radius;

  function polarToCartesian(angle: number) {
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  }

  const slices: ComputedSlice[] = useMemo(() => {
    if (total === 0) return [];

    let running = 0;

    return data.map((slice) => {
      const startAngle = (running / total) * 2 * Math.PI;
      const sliceAngle = (slice.value / total) * 2 * Math.PI;
      running += slice.value;

      return {
        ...slice,
        startAngle,
        sliceAngle,
      };
    });
  }, [data, total]);

  if (total === 0) {
    return (
      <div className="pie-wrapper">
        <p>هیچ داده‌ای برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="pie-wrapper">
      <svg
        width={size}
        height={size}
        role="img"
        aria-labelledby="chart-title chart-desc"
      >
        <title id="chart-title">Expense distribution</title>
        <desc id="chart-desc">
          Pie chart showing expense breakdown by category.
        </desc>

        {slices.map((slice, i) => {
          const percentage = Math.round((slice.value / total) * 100);

          const isFullCircle = slices.length === 1 || slice.value === total;

          if (isFullCircle) {
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill={slice.color}
                opacity={active === i || active === null ? 1 : 0.5}
                tabIndex={0}
                role="button"
                aria-label={`${slice.label}: ${slice.value} (${percentage}%)`}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            );
          }

          const endAngle = slice.startAngle + slice.sliceAngle;

          const largeArc = slice.sliceAngle > Math.PI ? 1 : 0;

          const start = polarToCartesian(slice.startAngle);
          const end = polarToCartesian(endAngle);

          const d = `
            M ${center} ${center}
            L ${start.x} ${start.y}
            A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
            Z
          `;

          return (
            <path
              key={i}
              d={d}
              fill={slice.color}
              opacity={active === i || active === null ? 1 : 0.5}
              tabIndex={0}
              role="button"
              aria-label={`${slice.label}: ${slice.value} (${percentage}%)`}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          );
        })}
      </svg>

      {active !== null && (
        <div className="pie-tooltip">
          <strong>{slices[active]?.label}</strong>
          <div>
            {slices[active].value.toLocaleString()} (
            {Math.round((slices[active].value / total) * 100)}
            %)
          </div>
        </div>
      )}

      <ul className="sr-only">
        {slices.map((slice, i) => (
          <li key={i}>
            {slice.label}: {slice.value.toLocaleString()} (
            {Math.round((slice.value / total) * 100)}
            %)
          </li>
        ))}
      </ul>
    </div>
  );
}
