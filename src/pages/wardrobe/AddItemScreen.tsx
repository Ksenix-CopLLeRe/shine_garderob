import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import StatusBar from "@/components/layout/StatusBar";

export default function AddItemScreen() {
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
            fontFamily: "'Playfair Display', serif",
            fontSize: 34,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          Добавить вещь
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            marginBottom: 48,
          }}
        >
          Shine распознает характеристики автоматически
        </div>
        <div style={{ flex: 1 }}>
          {[
            { icon: <I.Camera />, l: "Сделать фото", s: "Откроется камера" },
            {
              icon: <I.Image />,
              l: "Выбрать из галереи",
              s: "Загрузить фото вещи",
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => ctx.go("item-recognition")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "22px 0",
                borderTop: "1px solid #1E1E1E",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                color: "#F3F0E9",
              }}
            >
              {item.icon}
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {item.l}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#5A5855",
                    marginTop: 2,
                  }}
                >
                  {item.s}
                </div>
              </div>
            </button>
          ))}
          <Divider />
        </div>
      </div>
    </div>
  );
}
