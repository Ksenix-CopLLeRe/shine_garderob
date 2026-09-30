import React from "react";

export default function Btn({
  children,
  onClick,
  variant = "primary",
  full,
  small,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  full?: boolean;
  small?: boolean;
}) {
  const s: Record<string, React.CSSProperties> = {
    primary: { background: "#F3F0E9", color: "#0D0D0D", border: "none" },
    secondary: {
      background: "transparent",
      color: "#F3F0E9",
      border: "1px solid #3A3A3A",
    },
    ghost: { background: "transparent", color: "#6A6865", border: "none" },
    accent: { background: "#6B1F2B", color: "#F3F0E9", border: "none" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...s[variant],
        fontFamily: "'DM Sans', sans-serif",
        fontSize: small ? 12 : 13,
        fontWeight: 500,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        padding: small ? "10px 20px" : "15px 24px",
        width: full ? "100%" : undefined,
        borderRadius: 1,
        cursor: "pointer",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {children}
    </button>
  );
}
