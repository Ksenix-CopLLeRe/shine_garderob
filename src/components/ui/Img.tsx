import React, { useState } from "react";

export default function Img({
  src,
  alt,
  className,
  onClick,
  overlay,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  overlay?: boolean;
}) {
  // A broken photo falls back to the plain placeholder background.
  const [broken, setBroken] = useState(false);
  return (
    <div
      onClick={onClick}
      className={["image", onClick && "image--clickable", className].filter(Boolean).join(" ")}
    >
      {!broken && (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          className="shine-style-0026"
        />
      )}
      {overlay && (
        <div
          className="shine-style-0027"
        />
      )}
    </div>
  );
}
