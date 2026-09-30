import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function PhotoUploadScreen() {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => {
            ctx.setAuth(true);
            ctx.go("home-auth");
          }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#5A5855",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Пропустить
        </button>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8px 24px 32px",
        }}
      >
        <Caption style={{ marginBottom: 20 }}>Шаг 1 / 2</Caption>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.2,
            marginBottom: 28,
            marginTop: 8,
          }}
        >
          Добавьте
          <br />
          ваше фото
        </div>
        <Placeholder
          label="Фото пользователя"
          style={{ width: "100%", flex: 1, minHeight: 260, marginBottom: 28 }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => {
              ctx.setHasPhoto(true);
              ctx.go("ai-reaction");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "14px 24px",
              border: "1px solid #F3F0E9",
              background: "transparent",
              borderRadius: 1,
              color: "#F3F0E9",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            <I.Camera /> Сделать фото
          </button>
          <button
            onClick={() => {
              ctx.setHasPhoto(true);
              ctx.go("ai-reaction");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "14px 24px",
              border: "1px solid #2A2A2A",
              background: "transparent",
              borderRadius: 1,
              color: "#6A6865",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            <I.Image /> Из галереи
          </button>
        </div>
      </div>
    </div>
  );
}
