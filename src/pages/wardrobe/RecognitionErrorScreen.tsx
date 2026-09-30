import { useApp } from "@/app/AppContext";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function RecognitionErrorScreen() {
  const ctx = useApp();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
      }}
    >
      <StatusBar />
      <div style={{ padding: "4px 24px" }}>
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8px 24px 40px",
        }}
      >
        <Placeholder
          label="Фото вещи"
          style={{ width: "100%", height: 240, marginBottom: 32, marginTop: 8 }}
        />
        <div
          style={{
            width: 1,
            height: 32,
            background: "#6B1F2B",
            marginBottom: 24,
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.3,
            marginBottom: 12,
          }}
        >
          Не удалось рассмотреть вещь
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Попробуйте сфотографировать вещь на светлом фоне, целиком.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Btn full onClick={() => ctx.go("item-recognition")}>
            Сделать другое фото
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => ctx.go("item-recognition")}
          >
            Выбрать другое из галереи
          </Btn>
        </div>
      </div>
    </div>
  );
}
