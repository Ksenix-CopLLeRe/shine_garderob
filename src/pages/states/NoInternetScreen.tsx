import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";

export default function NoInternetScreen() {
  const ctx = useApp();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0D0D0D",
        padding: "0 40px",
        textAlign: "center",
      }}
    >
      <div style={{ color: "#2A2A2A", marginBottom: 28 }}>
        <I.Wifi />
      </div>
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
        Нет соединения
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
        Проверьте подключение к интернету
      </div>
      <button
        onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "#0D0D0D",
          background: "#F3F0E9",
          border: "none",
          padding: "14px 24px",
          borderRadius: 1,
          cursor: "pointer",
        }}
      >
        <I.Refresh /> Повторить
      </button>
    </div>
  );
}
