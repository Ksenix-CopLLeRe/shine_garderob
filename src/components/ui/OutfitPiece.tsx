import React from "react";
import { I } from "@/components/icons";

export default function OutfitPiece({
  src,
  alt,
  style,
  editing,
  removed,
  onReplace,
  onRemove,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  editing?: boolean;
  removed?: boolean;
  onReplace?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1A1A1A",
        flexShrink: 0,
        outline: editing ? "1px solid #6B1F2B" : "none",
        ...style,
      }}
    >
      {removed ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#151313",
            color: "#6A6865",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Вещь
          <br />
          удалена
        </div>
      ) : (
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
      )}
      {editing && !removed && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <button
            aria-label={`Заменить: ${alt}`}
            onClick={onReplace}
            style={{
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              color: "#F3F0E9",
              background: "rgba(13,13,13,0.94)",
              border: "1px solid #4A4845",
              cursor: "pointer",
            }}
          >
            <I.Edit />
          </button>
          <button
            aria-label={`Удалить: ${alt}`}
            onClick={onRemove}
            style={{
              width: 32,
              height: 32,
              display: "grid",
              placeItems: "center",
              color: "#F3F0E9",
              background: "#6B1F2B",
              border: "1px solid #8B2D3B",
              cursor: "pointer",
            }}
          >
            <I.X />
          </button>
        </div>
      )}
    </div>
  );
}
