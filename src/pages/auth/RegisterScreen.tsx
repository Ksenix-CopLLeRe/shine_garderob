import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function RegisterScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0045"
    >
      <StatusBar />
      <div
        className="shine-style-0046"
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => ctx.go("login")}
          className="shine-style-0047"
        >
          Войти
        </button>
      </div>
      <div
        className="shine-style-0048"
      >
        <div
          className="shine-style-0049"
        >
          Регистрация
        </div>
        <div
          className="shine-style-0050"
        >
          {[
            { l: "Имя", p: "Ваше имя", t: "text" },
            { l: "Email", p: "email@example.com", t: "email" },
            { l: "Пароль", p: "••••••••", t: "password" },
          ].map((f) => (
            <div key={f.l}>
              <Caption className="shine-style-0051">{f.l}</Caption>
              <input
                type={f.t}
                placeholder={f.p}
                className="shine-style-0052"
              />
            </div>
          ))}
          <Btn
            full
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("save-success");
            }}
          >
            Создать аккаунт
          </Btn>
        </div>
      </div>
    </div>
  );
}
