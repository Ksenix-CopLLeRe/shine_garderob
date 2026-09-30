import { createContext, useContext, useEffect, useState } from "react";

// `framed` — rendered inside the desktop phone mockup.
// `device` — rendered full-screen on a real phone (no fake status bar, safe-area insets).
export type ShellMode = "framed" | "device";

export const ShellContext = createContext<ShellMode>("framed");

export function useShellMode(): ShellMode {
  return useContext(ShellContext);
}

const DEVICE_QUERY = "(max-width: 500px)";

// `?frame=1` / `?frame=0` forces the mode regardless of viewport width.
function detect(): ShellMode {
  const force = new URLSearchParams(window.location.search).get("frame");
  if (force === "1") return "framed";
  if (force === "0") return "device";
  return window.matchMedia(DEVICE_QUERY).matches ? "device" : "framed";
}

export function useDetectedShellMode(): ShellMode {
  const [mode, setMode] = useState<ShellMode>(detect);
  useEffect(() => {
    const mq = window.matchMedia(DEVICE_QUERY);
    const onChange = () => setMode(detect());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mode;
}
