interface SunLogoProps {
  className?: string;
  size?: "favicon" | "card" | "header" | "signage";
}

export default function SunLogo({ className = "", size = "header" }: SunLogoProps) {
  // Scale based on size variant
  const scales = {
    favicon: 0.23,
    card: 0.375,
    header: 0.625,
    signage: 1,
  };

  const scale = scales[size];
  const viewBoxSize = 70 * scale;

  return (
    <svg
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(${viewBoxSize / 2}, ${viewBoxSize / 2}) scale(${scale})`}>
        {/* Center circle */}
        <circle r="13" fill="currentColor" />

        {/* 8 rays */}
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(45)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(90)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(135)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(180)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(225)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(270)" />
        <rect x="-2.5" y="19" width="5" height="13" rx="2.5" fill="currentColor" transform="rotate(315)" />
      </g>
    </svg>
  );
}
