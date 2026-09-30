import React from "react";

export default function Tag({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 11,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        padding: "7px 14px",
        borderRadius: 1,
        border: "1px solid",
        borderColor: active ? "#F3F0E9" : "#2A2A2A",
        color: active ? "#F3F0E9" : "#5A5855",
        background: "transparent",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
