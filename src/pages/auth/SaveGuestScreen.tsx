import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function SaveGuestScreen() {
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
        <div
          style={{
            display: "flex",
            gap: 8,
            height: 140,
            marginBottom: 28,
            marginTop: 8,
          }}
        >
          <Img
            src={IMGS.editorialBlazer}
            alt="outfit preview"
            style={{ flex: 1.3, height: "100%" }}
          />
          <Img
            src={IMGS.itemCoat}
            alt="outfit piece"
            style={{ flex: 0.7, height: "100%" }}
          />
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          Сохрани образ и свой гардероб
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
          Создайте аккаунт — и образы будут всегда под рукой.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn
            full
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("register");
            }}
          >
            Зарегистрироваться
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("login");
            }}
          >
            Войти
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.back()}>
            Вернуться к образу
          </Btn>
        </div>
      </div>
    </div>
  );
}
