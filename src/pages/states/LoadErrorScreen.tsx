import { useApp } from "@/app/AppContext";
import Btn from "@/components/ui/Btn";

export default function LoadErrorScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0335"
    >
      <div
        className="shine-style-0336"
      />
      <div
        className="shine-style-0337"
      >
        Что-то пошло не так
      </div>
      <div
        className="shine-style-0338"
      >
        Не удалось загрузить данные. Проверьте соединение и попробуйте снова.
      </div>
      <Btn onClick={() => ctx.go(ctx.isAuth ? "home-auth" : "welcome")}>
        Попробовать снова
      </Btn>
    </div>
  );
}
