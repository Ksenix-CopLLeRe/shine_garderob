import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function SavedEmptyScreen() {
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
      <div style={{ padding: "4px 24px 12px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 26,
            fontWeight: 400,
            color: "#F3F0E9",
          }}
        >
          Образы
        </div>
      </div>
      <Divider />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 28,
            height: 1,
            background: "#252525",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.3,
            marginBottom: 16,
          }}
        >
          Пока нет
          <br />
          сохранённых образов
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            lineHeight: 1.75,
            marginBottom: 40,
          }}
        >
          Подберите первый образ — Shine сохранит его в вашу коллекцию
        </div>
        <Btn onClick={() => ctx.go("situation")}>Подобрать первый образ</Btn>
      </div>
      <BottomNav active="outfits" />
    </div>
  );
}
