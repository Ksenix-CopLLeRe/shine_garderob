import React from "react";

export default function Img({
  src,
  alt,
  style,
  onClick,
  overlay,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  overlay?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1A1A1A",
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13,13,13,0.35)",
          }}
        />
      )}
    </div>
  );
}
