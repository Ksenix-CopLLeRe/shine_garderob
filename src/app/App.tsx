import { AppProvider, useApp } from "@/app/AppContext";
import { ROUTES } from "@/app/routes";
import PhoneFrame from "@/components/shell/PhoneFrame";
import ScreenNavigator from "@/components/shell/ScreenNavigator";
import DevScreenMenu from "@/components/shell/DevScreenMenu";
import {
  ShellContext,
  useDetectedShellMode,
} from "@/components/shell/ShellContext";

function CurrentScreen() {
  const { screen, params } = useApp();
  const Page = ROUTES[screen];
  // Remount on id change so detail screens never show the previous record.
  return <Page key={`${screen}/${params.id ?? ""}`} />;
}

function Shell() {
  const mode = useDetectedShellMode();

  if (mode === "device") {
    return (
      <ShellContext.Provider value="device">
        <div
          style={{
            height: "100dvh",
            background: "#0D0D0D",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <CurrentScreen />
        </div>
        {import.meta.env.DEV && <DevScreenMenu />}
      </ShellContext.Provider>
    );
  }

  return (
    <ShellContext.Provider value="framed">
      <div
        style={{
          minHeight: "100vh",
          background: "#040404",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 20px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <PhoneFrame>
          <CurrentScreen />
        </PhoneFrame>
        <div style={{ marginTop: 16 }}>
          <ScreenNavigator />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
