import { useShellMode } from "@/components/shell/ShellContext";

// Fake iOS status bar for the desktop mockup; on a real phone it only reserves the notch area.
export default function StatusBar({ light }: { light?: boolean }) {
  const mode = useShellMode();
  const c = light ? "#F3F0E9" : "#F3F0E9";
  if (mode === "device") {
    return <div style={{ height: "env(safe-area-inset-top)", flexShrink: 0 }} />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 24px 6px",
        height: 44,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: c,
          letterSpacing: "0.01em",
        }}
      >
        9:41
      </span>
      {/* Dynamic island */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 10,
          transform: "translateX(-50%)",
          width: 90,
          height: 24,
          background: "#000",
          borderRadius: 12,
        }}
      />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          {[3, 4, 5, 6].map((h, i) => (
            <div
              key={i}
              style={{ width: 3, height: h, background: c, borderRadius: 1 }}
            />
          ))}
        </div>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path
            d="M1 3.5C3.3 1.3 6 0 8 0s4.7 1.3 7 3.5"
            stroke={c}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M3 6.5C4.5 5 6.2 4.2 8 4.2s3.5.8 5 2.3"
            stroke={c}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="8" cy="9.5" r="1.2" fill={c} />
        </svg>
        <div
          style={{
            width: 26,
            height: 13,
            border: `1.5px solid ${c}`,
            borderRadius: 2,
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "100%",
              background: c,
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
