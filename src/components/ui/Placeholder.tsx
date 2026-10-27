import React from "react";

/* Gray placeholder — kept for user-uploaded photos and error states */
export default function Placeholder({
  label,
  className,
  onClick,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={["placeholder", onClick && "placeholder--clickable", className].filter(Boolean).join(" ")}
    >
      <span
        className="shine-style-0034"
      >
        {label}
      </span>
    </div>
  );
}
