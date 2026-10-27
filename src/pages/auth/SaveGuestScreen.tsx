import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function SaveGuestScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0053"
    >
      <StatusBar />
      <div className="shine-style-0054">
        <BackBtn onClick={() => ctx.back()} />
      </div>
      <div
        className="shine-style-0055"
      >
        <div
          className="shine-style-0056"
        >
          <Img
            src={IMGS.editorialBlazer}
            alt="outfit preview"
            className="shine-style-0057"
          />
          <Img
            src={IMGS.itemCoat}
            alt="outfit piece"
            className="shine-style-0058"
          />
        </div>
        <div
          className="shine-style-0059"
        >
          Сохрани образ и свой гардероб
        </div>
        <div
          className="shine-style-0060"
        >
          Создайте аккаунт — и образы будут всегда под рукой.
        </div>
        <div className="shine-style-0061">
          <Btn
            full
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("register");
            }}
          >
            Зарегистрироваться
          </Btn>
          <Btn
            full
            variant="secondary"
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("login");
            }}
          >
            Войти
          </Btn>
          <Btn full variant="ghost" onClick={() => ctx.back()}>
            Вернуться к образу
          </Btn>
        </div>
      </div>
    </div>
  );
}
