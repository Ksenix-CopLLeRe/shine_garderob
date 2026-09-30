import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function WelcomeScreen() {
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
          justifyContent: "space-between",
          padding: "12px 24px 32px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 50,
              fontWeight: 400,
              color: "#F3F0E9",
              lineHeight: 1.06,
              marginBottom: 20,
            }}
          >
            Что надеть
            <br />
            <em>сегодня?</em>
          </div>
          <div
            style={{
              width: 20,
              height: 1,
              background: "#6B1F2B",
              marginBottom: 20,
            }}
          />
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "#6A6865",
              lineHeight: 1.7,
            }}
          >
            Shine подбирает образы из вашего гардероба с учётом погоды, ситуации
            и личного стиля.
          </div>
        </div>

        {/* Editorial image pair */}
        <div style={{ position: "relative", height: 210, marginBottom: 28 }}>
          <Img
            src={IMGS.editorialBlazer}
            alt="fashion editorial"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 152,
              height: 196,
            }}
          />
          <Img
            src={IMGS.editorialBWCoat}
            alt="fashion editorial"
            style={{
              position: "absolute",
              right: 0,
              top: 20,
              width: 124,
              height: 168,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              height: 36,
              background: "#2A2A2A",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn full onClick={() => ctx.go("personalize")}>
            Начать
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.go("situation")}>
            Попробовать без регистрации
          </Btn>
        </div>
      </div>
    </div>
  );
}
