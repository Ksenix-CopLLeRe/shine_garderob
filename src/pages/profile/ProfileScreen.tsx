import type { Screen } from "@/navigation/screens";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import StatusBar from "@/components/layout/StatusBar";
import BottomNav from "@/components/layout/BottomNav";

export default function ProfileScreen() {
  const ctx = useApp();
  const name = ctx.userName || "Алина";

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
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        {/* Large editorial portrait */}
        <div style={{ position: "relative" }}>
          <Img
            src={IMGS.portraitBlazer}
            alt="user portrait"
            style={{ width: "100%", height: 300 }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, #0D0D0D 20%, transparent)",
              padding: "60px 24px 16px",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 400,
                color: "#F3F0E9",
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#8A8680",
                marginTop: 4,
              }}
            >
              Минимализм · Кэжуал · Работа
            </div>
          </div>
        </div>

        <div style={{ padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #1E1E1E",
              marginBottom: 8,
            }}
          >
            {[
              { n: "24", l: "Вещей" },
              { n: "8", l: "Образов" },
              { n: "3", l: "Стиля" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "20px 0",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid #1E1E1E" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 30,
                    fontWeight: 400,
                    color: "#F3F0E9",
                  }}
                >
                  {s.n}
                </div>
                <Caption style={{ marginTop: 4 }}>{s.l}</Caption>
              </div>
            ))}
          </div>
          {[
            { l: "Предпочтения стиля", sc: "style-prefs" as Screen },
            { l: "Настройки", sc: "settings" as Screen },
          ].map((item) => (
            <button
              key={item.l}
              onClick={() => ctx.go(item.sc)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 0",
                borderBottom: "1px solid #1E1E1E",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#F3F0E9",
                }}
              >
                {item.l}
              </div>
              <div style={{ color: "#3D3D3B" }}>
                <I.ChevronRight />
              </div>
            </button>
          ))}
          <div style={{ height: 8 }} />
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
}
