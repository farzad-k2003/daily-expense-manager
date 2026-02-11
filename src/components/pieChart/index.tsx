import { useState } from "react";
import "./style.css";

type Slice = {
  label: string;
  value: number;
  color: string;
};

export function PieChart({
  data,
  size = 260,
}: {
  data: Slice[];
  size?: number;
}) {
  const [active, setActive] = useState<number | null>(null);

  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = size / 2;
  const center = radius;

  let cumulative = 0;

  function polarToCartesian(angle: number) {
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
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

        {data.map((slice, i) => {
          const percentage = Math.round((slice.value / total) * 100);
          const isFullCircle = data.length === 1 || slice.value === total;

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

          const startAngle = (cumulative / total) * 2 * Math.PI;
          const sliceAngle = (slice.value / total) * 2 * Math.PI;
          cumulative += slice.value;

          const endAngle = startAngle + sliceAngle;
          const largeArc = sliceAngle > Math.PI ? 1 : 0;

          const start = polarToCartesian(startAngle);
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
          <strong>{data[active]?.label}</strong>
          <div>
            {data[active].value.toLocaleString()} (
            {Math.round((data[active].value / total) * 100)}%)
          </div>
        </div>
      )}

      <ul className="sr-only">
        {data.map((slice, i) => (
          <li key={i}>
            {slice.label}: {slice.value.toLocaleString()} (
            {Math.round((slice.value / total) * 100)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
