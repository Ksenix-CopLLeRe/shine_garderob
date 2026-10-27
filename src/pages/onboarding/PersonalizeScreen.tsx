import { useState } from "react";
import { useApp } from "@/app/AppContext";
import Caption from "@/components/ui/Caption";
import Placeholder from "@/components/ui/Placeholder";
import Btn from "@/components/ui/Btn";
import StatusBar from "@/components/layout/StatusBar";

export default function PersonalizeScreen() {
  const ctx = useApp();
  const [name, setName] = useState("");
  return (
    <div
      className="shine-style-0101"
    >
      <StatusBar />
      <div
        className="shine-style-0102"
      >
        <div
          className="shine-style-0103"
        >
          <button
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("home-auth");
            }}
            className="shine-style-0104"
          >
            Пропустить
          </button>
        </div>
        <div
          className="shine-style-0105"
        >
          Сделаем
          <br />
          <em>Shine</em> вашим
        </div>
        <div
          className="shine-style-0106"
        >
          Фото персонализирует ваше пространство. Это не виртуальная примерка —
          образы показываются как коллаж вещей.
        </div>
        <div
          className="shine-style-0107"
        >
          <div className="shine-style-0108">
            <button
              onClick={() => ctx.go("photo-upload")}
              className="shine-style-0109"
            >
              <Placeholder
                label="Фото"
                className="shine-style-0110"
              />
              <div>
                <div
                  className="shine-style-0111"
                >
                  Добавить фото
                </div>
                <div
                  className="shine-style-0112"
                >
                  Оставайтесь собой в профиле
                </div>
              </div>
            </button>
            <div>
              <Caption>Имя</Caption>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  ctx.setUserName(e.target.value);
                }}
                placeholder="Как вас называть?"
                className="shine-style-0113"
              />
            </div>
          </div>
          <Btn
            full
            onClick={() => {
              ctx.setAuth(true);
              ctx.go("home-auth");
            }}
          >
            Продолжить
          </Btn>
        </div>
      </div>
    </div>
  );
}
