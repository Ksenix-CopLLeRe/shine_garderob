import { useState } from "react";
import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function PersonalizeScreen() {
  const ctx = useApp();
  const [name, setName] = useState("");
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 28,
          }}
        >
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
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            fontWeight: 400,
            color: "#F3F0E9",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Сделаем
          <br />
          <em>Shine</em> вашим
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
          Фото персонализирует ваше пространство. Это не виртуальная примерка —
          образы показываются как коллаж вещей.
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <button
              onClick={() => ctx.go("photo-upload")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 16,
                border: "1px solid #2A2A2A",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                borderRadius: 1,
              }}
            >
              <Placeholder
                label="Фото"
                style={{ width: 52, height: 52, flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#F3F0E9",
                    fontWeight: 500,
                  }}
                >
                  Добавить фото
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#5A5855",
                    marginTop: 2,
                  }}
                >
                  Оставайтесь собой в профиле
                </div>
              </div>
            </button>
            <div>
              <Caption>Имя</Caption>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  ctx.setUserName(e.target.value);
                }}
                placeholder="Как вас называть?"
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
                  marginTop: 8,
                }}
              />
            </div>
          </div>
          <Btn
            full
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("home-auth");
            }}
          >
            Продолжить
          </Btn>
        </div>
      </div>
    </div>
  );
}
