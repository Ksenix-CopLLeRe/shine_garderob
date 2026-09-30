import { IMGS } from "@/constants/images";

export default function SplashScreen() {
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        background: "#0D0D0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={IMGS.editorialDarkCoat}
        alt="fashion"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.22,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #0D0D0D 0%, transparent 30%, transparent 70%, #0D0D0D 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          textAlign: "center",
          animation: "fadeIn 1s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 84,
            fontWeight: 400,
            color: "#F3F0E9",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          Shine
        </div>
        <div
          style={{
            width: 32,
            height: 1,
            background: "#6B1F2B",
            margin: "18px auto 18px",
          }}
        />
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: "#6A6865",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Shine bright like a diamond
        </div>
      </div>
    </div>
  );
}
