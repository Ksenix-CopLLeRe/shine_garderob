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
      className={["tag", active && "tag--active"].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
