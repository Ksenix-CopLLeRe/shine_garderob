import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function LoginScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0035"
    >
      <StatusBar />
      <div
        className="shine-style-0036"
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => ctx.go("register")}
          className="shine-style-0037"
        >
          Регистрация
        </button>
      </div>
      <div
        className="shine-style-0038"
      >
        <div
          className="shine-style-0039"
        >
          Вход
        </div>
        <div
          className="shine-style-0040"
        >
          {[
            { l: "Email", p: "email@example.com", t: "email" },
            { l: "Пароль", p: "••••••••", t: "password" },
          ].map((f) => (
            <div key={f.l}>
              <Caption className="shine-style-0041">{f.l}</Caption>
              <input
                type={f.t}
                placeholder={f.p}
                className="shine-style-0042"
              />
            </div>
          ))}
          <div>
            <Btn
              full
              onClick={() => {
                ctx.setAuth(true);
                ctx.go("save-success");
              }}
            >
              Войти
            </Btn>
            <div className="shine-style-0043">
              <button
                className="shine-style-0044"
              >
                Забыли пароль?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
