import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isScreen, type Screen } from "@/navigation/screens";

export interface AppState {
  screen: Screen;
  go: (s: Screen) => void;
  back: () => void;
  isAuth: boolean;
  setAuth: (v: boolean) => void;
  userName: string;
  setUserName: (v: string) => void;
  hasPhoto: boolean;
  setHasPhoto: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

// Lets a specific screen be opened directly, e.g. http://192.168.1.10:8443/#outfit-result
function initialScreen(): Screen {
  const hash = window.location.hash.slice(1);
  return isScreen(hash) ? hash : "splash";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Screen[]>(() => [initialScreen()]);
  const [isAuth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  const screen = history[history.length - 1];

  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setHistory(["welcome"]), 3000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => {
    window.history.replaceState(null, "", `#${screen}`);
  }, [screen]);

  const value = useMemo<AppState>(
    () => ({
      screen,
      go: (s) => setHistory((prev) => [...prev, s]),
      back: () => setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev)),
      isAuth,
      setAuth,
      userName,
      setUserName,
      hasPhoto,
      setHasPhoto,
    }),
    [screen, isAuth, userName, hasPhoto],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
