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
    <div className={["screen-navigator", width === "100%" && "screen-navigator--fluid"].filter(Boolean).join(" ")}>
      <button
        onClick={() => setShowNav((p) => !p)}
        className="shine-style-0019"
      >
        <span
          className="shine-style-0020"
        >
          Экран: <span className="shine-style-0021">{currentLabel}</span>
        </span>
        <span
          className="shine-style-0022"
        >
          {showNav ? "Скрыть ▲" : "Все экраны ▼"}
        </span>
      </button>

      {showNav && (
        <div className={["screen-navigator__menu", maxHeight === "70dvh" && "screen-navigator__menu--device"].filter(Boolean).join(" ")}>
          {SCREEN_GROUPS.map((group) => (
            <div key={group.group}>
              <div
                className="shine-style-0023"
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
                  className={["screen-navigator__option", screen === s.id && "screen-navigator__option--active"].filter(Boolean).join(" ")}
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
