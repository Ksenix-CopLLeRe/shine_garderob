import { useApp } from "@/app/AppContext";
import { I } from "@/components/icons";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import BackBtn from "@/components/ui/BackBtn";
import StatusBar from "@/components/layout/StatusBar";

export default function PhotoUploadScreen() {
  const ctx = useApp();
  return (
    <div
      className="shine-style-0114"
    >
      <StatusBar />
      <div
        className="shine-style-0115"
      >
        <BackBtn onClick={() => ctx.back()} />
        <button
          onClick={() => {
            ctx.setAuth(true);
            ctx.go("home-auth");
          }}
          className="shine-style-0116"
        >
          Пропустить
        </button>
      </div>
      <div
        className="shine-style-0117"
      >
        <Caption className="shine-style-0118">Шаг 1 / 2</Caption>
        <div
          className="shine-style-0119"
        >
          Добавьте
          <br />
          ваше фото
        </div>
        <Placeholder
          label="Фото пользователя"
          className="shine-style-0120"
        />
        <div className="shine-style-0121">
          <button
            onClick={() => {
              ctx.setHasPhoto(true);
              ctx.go("ai-reaction");
            }}
            className="shine-style-0122"
          >
            <I.Camera /> Сделать фото
          </button>
          <button
            onClick={() => {
              ctx.setHasPhoto(true);
              ctx.go("ai-reaction");
            }}
            className="shine-style-0123"
          >
            <I.Image /> Из галереи
          </button>
        </div>
      </div>
    </div>
  );
}
