import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function LoginScreen() {
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
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => ctx.go("register")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#5A5855",
            letterSpacing: "0.06em",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          Регистрация
        </button>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "12px 24px 40px",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            fontWeight: 400,
            color: "#F3F0E9",
            marginBottom: 40,
            marginTop: 8,
          }}
        >
          Вход
        </div>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 32 }}
        >
          {[
            { l: "Email", p: "email@example.com", t: "email" },
            { l: "Пароль", p: "••••••••", t: "password" },
          ].map((f) => (
            <div key={f.l}>
              <Caption style={{ marginBottom: 8 }}>{f.l}</Caption>
              <input
                type={f.t}
                placeholder={f.p}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid #2A2A2A",
                  padding: "12px 0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  color: "#F3F0E9",
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div>
            <Btn
              full
              onClick={() => {
                ctx.setAuth(true);
                ctx.go("save-success");
              }}
            >
              Войти
            </Btn>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#5A5855",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Забыли пароль?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
