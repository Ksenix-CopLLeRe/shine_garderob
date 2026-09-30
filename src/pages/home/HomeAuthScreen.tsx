import { useApp } from "@/app/AppContext";
import HomeScreen from "@/pages/home/HomeScreen";

export default function HomeAuthScreen() {
  const ctx = useApp();
  return <HomeScreen name={ctx.userName || "Алина"} />;
}
