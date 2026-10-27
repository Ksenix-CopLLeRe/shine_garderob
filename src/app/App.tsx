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
        <div className="shine-theme shine-style-0001">
          <CurrentScreen />
        </div>
        {import.meta.env.DEV && <DevScreenMenu />}
      </ShellContext.Provider>
    );
  }

  return (
    <ShellContext.Provider value="framed">
      <div className="shine-theme shine-style-0002">
        <PhoneFrame>
          <CurrentScreen />
        </PhoneFrame>
        <div className="shine-style-0003">
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
