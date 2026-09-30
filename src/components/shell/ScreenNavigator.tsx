import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { SCREEN_GROUPS, screenLabel } from "@/navigation/screens";

// Dev helper: jump to any screen. `width` is fixed under the desktop mockup, fluid on a phone.
export default function ScreenNavigator({
  width = 390,
  defaultOpen = false,
  onPick,
  maxHeight = 320,
}: {
  width?: number | string;
  defaultOpen?: boolean;
  onPick?: () => void;
  maxHeight?: number | string;
}) {
  const { screen, go } = useApp();
  const [showNav, setShowNav] = useState(defaultOpen);
  const currentLabel = screenLabel(screen);

  return (
    <div style={{ width }}>
      <button
        onClick={() => setShowNav((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          background: "#0D0D0D",
          border: "1px solid #1E1E1E",
          cursor: "pointer",
          color: "#F3F0E9",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#5A5855",
          }}
        >
          Экран: <span style={{ color: "#F3F0E9" }}>{currentLabel}</span>
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#5A5855",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {showNav ? "Скрыть ▲" : "Все экраны ▼"}
        </span>
      </button>

      {showNav && (
        <div
          style={{
            background: "#0A0A0A",
            border: "1px solid #1A1A1A",
            borderTop: "none",
            maxHeight,
            overflowY: "auto",
            padding: "8px 0",
          }}
        >
          {SCREEN_GROUPS.map((group) => (
            <div key={group.group}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#333",
                  padding: "10px 16px 6px",
                }}
              >
                {group.group}
              </div>
              {group.screens.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    go(s.id);
                    setShowNav(false);
                    onPick?.();
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 16px",
                    background: screen === s.id ? "#141414" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: screen === s.id ? "#F3F0E9" : "#5A5855",
                    borderLeft:
                      screen === s.id
                        ? "2px solid #6B1F2B"
                        : "2px solid transparent",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
