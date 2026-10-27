import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";

export default function NoInternetScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0339"
    >
      <div className="shine-style-0340">
        <I.Wifi />
      </div>
      <div
        className="shine-style-0341"
      >
        Нет соединения
      </div>
      <div
        className="shine-style-0342"
      >
        Проверьте подключение к интернету
      </div>
      <button
        onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}
        className="shine-style-0343"
      >
        <I.Refresh /> Повторить
      </button>
    </div>
  );
}
