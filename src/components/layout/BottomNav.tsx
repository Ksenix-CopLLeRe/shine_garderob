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
      className="shine-style-0004"
    >
      <div className="shine-style-0005">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => ctx.go(tab.screen)}
            className={["bottom-nav__item", active === tab.id && "bottom-nav__item--active"].filter(Boolean).join(" ")}
          >
            {tab.icon}
            <span
              className="shine-style-0006"
            >
              {tab.label}
            </span>
            {active === tab.id && (
              <div
                className="shine-style-0007"
              />
            )}
          </button>
        ))}
      </div>
      {/* Home-indicator gap; on a real phone the shell already pads the safe area */}
      {mode === "framed" && <div className="shine-style-0008" />}
    </div>
  );
}
