import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function NoOutfitScreen() {
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
          padding: "0 24px 40px",
        }}
      >
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: 1,
            height: 40,
            background: "#252525",
            marginBottom: 24,
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.35,
            marginBottom: 12,
          }}
        >
          Сегодня гардероб немного ограничивает варианты
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
          Попробуем подобрать ближайший вариант или изменим условия.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn full variant="secondary" onClick={() => ctx.go("situation")}>
            Изменить условия
          </Btn>
          <Btn full onClick={() => ctx.go("outfit-result")}>
            Посмотреть ближайший вариант
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.go("add-item")}>
            Добавить вещи
          </Btn>
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
