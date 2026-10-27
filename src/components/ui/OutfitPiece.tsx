import React from "react";
import { I } from "@/components/icons";

export default function OutfitPiece({
  src,
  alt,
  className,
  editing,
  removed,
  onReplace,
  onRemove,
}: {
  src: string;
  alt: string;
  className?: string;
  editing?: boolean;
  removed?: boolean;
  onReplace?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className={["outfit-piece", editing && "outfit-piece--editing", className].filter(Boolean).join(" ")}>
      {removed ? (
        <div
          className="shine-style-0029"
        >
          Вещь
          <br />
          удалена
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="shine-style-0030"
        />
      )}
      {editing && !removed && (
        <div
          className="shine-style-0031"
        >
          <button
            aria-label={`Заменить: ${alt}`}
            onClick={onReplace}
            className="shine-style-0032"
          >
            <I.Edit />
          </button>
          <button
            aria-label={`Удалить: ${alt}`}
            onClick={onRemove}
            className="shine-style-0033"
          >
            <I.X />
          </button>
        </div>
      )}
    </div>
  );
}
