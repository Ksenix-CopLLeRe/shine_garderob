import React from "react";

/* Gray placeholder — kept for user-uploaded photos and error states */
export default function Placeholder({
  label,
  style,
  onClick,
}: {
  label: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#1A1A1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
        ...style,
      }}
    >
      <span
        style={{
          color: "#3A3A38",
          fontSize: 10,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
          padding: "0 10px",
          whiteSpace: "pre-line",
          lineHeight: 1.6,
        }}
      >
        {label}
      </span>
    </div>
  );
}
