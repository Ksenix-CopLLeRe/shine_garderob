import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function AIReactionScreen() {
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "8px 24px 32px",
        }}
      >
        <Placeholder
          label="Фото пользователя"
          style={{ width: "100%", height: 260, marginBottom: 32 }}
        />
        <Caption style={{ color: "#6B1F2B", marginBottom: 24 }}>Shine</Caption>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}
        >
          {[
            { t: "Ваааай, что за лев этот тигр", italic: true },
            {
              t: "Будем собирать образы, которые работают именно на вас",
              italic: false,
            },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 1, background: "#6B1F2B", flexShrink: 0 }} />
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20,
                  fontStyle: item.italic ? "italic" : "normal",
                  color: "#F3F0E9",
                  lineHeight: 1.5,
                }}
              >
                {item.t}
              </div>
            </div>
          ))}
        </div>
        <Btn
          full
          onClick={() => {
            ctx.setAuth(true);
            ctx.go("home-auth");
          }}
        >
          Перейти в Shine
        </Btn>
      </div>
    </div>
  );
}
