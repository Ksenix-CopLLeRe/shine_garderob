import type { Screen } from "@/navigation/screens";
import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import { useShellMode } from "@/components/shell/ShellContext";

export default function BottomNav({ active }: { active: string }) {
  const ctx = useApp();
  const mode = useShellMode();
  const tabs = [
    {
      id: "home",
      label: "Главная",
      icon: <I.Home />,
      screen: (ctx.isAuth ? "home-auth" : "welcome") as Screen,
    },
    {
      id: "wardrobe",
      label: "Гардероб",
      icon: <I.Hanger />,
      screen: "wardrobe-filled" as Screen,
    },
    {
      id: "outfits",
      label: "Образы",
      icon: <I.Layers />,
      screen: "saved-outfits" as Screen,
    },
    {
      id: "profile",
      label: "Профиль",
      icon: <I.User />,
      screen: "profile" as Screen,
    },
  ];
  return (
    <div
      style={{
        borderTop: "1px solid #252525",
        background: "#0D0D0D",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => ctx.go(tab.screen)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 0 4px",
              background: "transparent",
              cursor: "pointer",
              border: "none",
              color: active === tab.id ? "#F3F0E9" : "#4A4845",
              position: "relative",
            }}
          >
            {tab.icon}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {tab.label}
            </span>
            {active === tab.id && (
              <div
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#6B1F2B",
                  position: "absolute",
                  bottom: 4,
                }}
              />
            )}
          </button>
        ))}
      </div>
      {/* Home-indicator gap; on a real phone the shell already pads the safe area */}
      {mode === "framed" && <div style={{ height: 18 }} />}
    </div>
  );
}
