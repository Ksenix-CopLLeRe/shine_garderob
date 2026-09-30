import { I } from "@/components/icons";

export default function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Назад"
      onClick={onClick}
      style={{
        color: "#F3F0E9",
        minWidth: 36,
        minHeight: 36,
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <I.ChevronLeft />
    </button>
  );
}
