import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isScreen, type Screen } from "@/navigation/screens";

// One history entry; `id` selects the record on detail screens (item-card, outfit-detail…).
export interface Route {
  screen: Screen;
  id?: string;
}

export interface AppState {
  screen: Screen;
  params: { id?: string };
  go: (s: Screen, id?: string) => void;
  /** Pops `steps` entries (default 1), never past the first screen. */
  back: (steps?: number) => void;
  isAuth: boolean;
  setAuth: (v: boolean) => void;
  userName: string;
  setUserName: (v: string) => void;
  hasPhoto: boolean;
  setHasPhoto: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

// `#outfit-detail/<id>` ↔ { screen, id }. Lets a screen be opened directly,
// e.g. http://192.168.1.10:8443/#outfit-result
function parseHash(hash: string): Route | null {
  const [screen, id] = hash.replace(/^#/, "").split("/");
  return screen && isScreen(screen)
    ? { screen, id: id ? decodeURIComponent(id) : undefined }
    : null;
}

const toHash = ({ screen, id }: Route) =>
  `#${screen}${id ? `/${encodeURIComponent(id)}` : ""}`;

export function AppProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Route[]>(() => [
    parseHash(window.location.hash) ?? { screen: "splash" },
  ]);
  const [isAuth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  const route = history[history.length - 1];

  useEffect(() => {
    if (route.screen === "splash") {
      const t = setTimeout(() => setHistory([{ screen: "welcome" }]), 3000);
      return () => clearTimeout(t);
    }
  }, [route.screen]);

  useEffect(() => {
    const hash = toHash(route);
    if (window.location.hash !== hash)
      window.history.replaceState(null, "", hash);
  }, [route]);

  // Editing the address bar navigates without a reload.
  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash(window.location.hash);
      if (next) setHistory((prev) => [...prev, next]);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      screen: route.screen,
      params: { id: route.id },
      go: (screen, id) => setHistory((prev) => [...prev, { screen, id }]),
      back: (steps = 1) =>
        setHistory((prev) => prev.slice(0, Math.max(1, prev.length - steps))),
      isAuth,
      setAuth,
      userName,
      setUserName,
      hasPhoto,
      setHasPhoto,
    }),
    [route, isAuth, userName, hasPhoto],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
