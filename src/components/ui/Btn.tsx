import React from "react";

export default function Btn({
  children,
  onClick,
  variant = "primary",
  full,
  small,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  full?: boolean;
  small?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={["btn", `btn--${variant}`, full && "btn--full", small && "btn--small", className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
