import React from "react";

export default function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["caption", className].filter(Boolean).join(" ")}>{children}</div>;
}
