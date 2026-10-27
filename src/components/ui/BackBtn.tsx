import { I } from "@/components/icons";

export default function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Назад"
      onClick={onClick}
      className="shine-style-0024"
    >
      <I.ChevronLeft />
    </button>
  );
}
