import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Btn from "@/components/ui/Btn";

export default function SaveSuccessScreen() {
  const ctx = useApp();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
        position: "relative",
      }}
    >
      {/* Background fashion image with overlay */}
      <img
        src={IMGS.editorialFieldDress}
        alt="fashion"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.12,
        }}
      />
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 1,
            height: 56,
            background: "#6B1F2B",
            margin: "0 auto 32px",
          }}
        />
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40,
            fontWeight: 400,
            color: "#F3F0E9",
            marginBottom: 12,
          }}
        >
          Образ сохранён
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#6A6865",
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Дождливый вторник добавлен в вашу коллекцию
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
          }}
        >
          <Btn full onClick={() => ctx.go("saved-outfits")}>
            Перейти к образам
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}
          >
            На главную
          </Btn>
        </div>
      </div>
    </div>
  );
}
