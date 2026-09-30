import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";

export default function LoadErrorScreen() {
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
      <div
        style={{
          width: 1,
          height: 40,
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
        Что-то пошло не так
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
        Не удалось загрузить данные. Проверьте соединение и попробуйте снова.
      </div>
      <Btn onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}>
        Попробовать снова
      </Btn>
    </div>
  );
}
