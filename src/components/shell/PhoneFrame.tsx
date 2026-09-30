import type { ReactNode } from "react";

// Desktop-only iPhone mockup around the app.
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: "#0D0D0D",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 44,
        boxShadow:
          "0 0 0 10px #111, 0 0 0 11px #1E1E1E, 0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.5)",
        border: "1px solid #2A2A2A",
      }}
    >
      {/* Side buttons */}
      <div
        style={{
          position: "absolute",
          right: -11,
          top: 140,
          width: 10,
          height: 56,
          background: "#111",
          borderRadius: "0 4px 4px 0",
          border: "1px solid #1E1E1E",
          borderLeft: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -11,
          top: 120,
          width: 10,
          height: 36,
          background: "#111",
          borderRadius: "4px 0 0 4px",
          border: "1px solid #1E1E1E",
          borderRight: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -11,
          top: 170,
          width: 10,
          height: 56,
          background: "#111",
          borderRadius: "4px 0 0 4px",
          border: "1px solid #1E1E1E",
          borderRight: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -11,
          top: 238,
          width: 10,
          height: 56,
          background: "#111",
          borderRadius: "4px 0 0 4px",
          border: "1px solid #1E1E1E",
          borderRight: "none",
        }}
      />

      {/* Screen clipping */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 44,
        }}
      >
        {children}
      </div>
    </div>
  );
}
