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
      <svg width={size} height={size}>
        {data.map((slice, i) => {
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
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onTouchStart={() => setActive(i)}
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
            <g
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={() => setActive(i)}
            >
              <path
                d={d}
                fill={slice.color}
                opacity={active === i || active === null ? 1 : 0.5}
              />
            </g>
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
    </div>
  );
}
