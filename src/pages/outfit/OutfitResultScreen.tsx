import { useState } from "react";
import { useApp } from "@/app/AppContext";
import { IMGS } from "@/constants/images";
import Caption from "@/components/ui/Caption";
import Img from "@/components/ui/Img";
import Btn from "@/components/ui/Btn";
import BackBtn from "@/components/ui/BackBtn";
import Divider from "@/components/ui/Divider";
import OutfitPiece from "@/components/ui/OutfitPiece";
import StatusBar from "@/components/layout/StatusBar";

export default function OutfitResultScreen() {
  const ctx = useApp();
  const [editing, setEditing] = useState(false);
  const [removed, setRemoved] = useState<string[]>([]);
  const changeVariants = [
    {
      label: "Другой стиль",
      sub: "Сменить направление",
      image: IMGS.itemGraySuit,
    },
    {
      label: "Хочу теплее",
      sub: "Добавить слои",
      image: IMGS.itemBlackPeacoat,
    },
    { label: "Хочу легче", sub: "Убрать лишнее", image: IMGS.itemWhiteShirt },
    { label: "Более базовый", sub: "Минимализм", image: IMGS.itemJeansDetail },
    {
      label: "Выразительнее",
      sub: "Акцент на детали",
      image: IMGS.itemBeltDetail,
    },
  ];
  const isRemoved = (piece: string) => removed.includes(piece);
  const removePiece = (piece: string) =>
    setRemoved((current) => [...current, piece]);

  return (
    <div
      className="shine-style-0173"
    >
      <StatusBar />
      <div
        className="shine-style-0174"
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>{editing ? "Редактирование образа" : "Образ"}</Caption>
        <div className="shine-style-0175" />
      </div>
      <div  className="scrollbar-hide shine-style-0176">
        {editing && (
          <div
            className="shine-style-0177"
          >
            <div className="shine-style-0178" />
            <div
              className="shine-style-0179"
            >
              Режим редактирования · заменить или удалить вещь
            </div>
          </div>
        )}
        <div className="shine-style-0180">
          <div className="shine-style-0181">
            <OutfitPiece
              src={IMGS.itemCoat}
              alt="Бежевый тренч"
              className="shine-style-0182"
              editing={editing}
              removed={isRemoved("coat")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("coat")}
            />
            <div
              className="shine-style-0183"
            >
              <OutfitPiece
                src={IMGS.itemWhiteShirt}
                alt="Белая рубашка"
                className="shine-style-0184"
                editing={editing}
                removed={isRemoved("shirt")}
                onReplace={() => ctx.go("replace-item")}
                onRemove={() => removePiece("shirt")}
              />
              <OutfitPiece
                src={IMGS.itemBlackJeans}
                alt="Прямые джинсы"
                className="shine-style-0185"
                editing={editing}
                removed={isRemoved("jeans")}
                onReplace={() => ctx.go("replace-item")}
                onRemove={() => removePiece("jeans")}
              />
            </div>
          </div>
          <div className="shine-style-0186">
            <OutfitPiece
              src={IMGS.itemLoafers}
              alt="Лоферы"
              className="shine-style-0187"
              editing={editing}
              removed={isRemoved("loafers")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("loafers")}
            />
            <OutfitPiece
              src={IMGS.itemBlackBag}
              alt="Кожаная сумка"
              className="shine-style-0188"
              editing={editing}
              removed={isRemoved("bag")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("bag")}
            />
          </div>
        </div>

        <Divider />

        <div className="shine-style-0189">
          <div
            className="shine-style-0190"
          >
            <div
              className="shine-style-0191"
            >
              Дождливый вторник
            </div>
            <div className="shine-style-0192">
              <div
                className="shine-style-0193"
              >
                Учёба
              </div>
              <div
                className="shine-style-0194"
              >
                +14°
              </div>
            </div>
          </div>
          <div
            className="shine-style-0195"
          >
            Практичный образ под дождь — тренч защитит от погоды, а базовые вещи
            дадут свободу движений.
          </div>
          {editing && (
            <div className="shine-style-0196">
              <Caption className="shine-style-0197">Варианты образа</Caption>
              <div
                
                className="scrollbar-hide shine-style-0198"
              >
                {changeVariants.map((variant) => (
                  <button
                    key={variant.label}
                    onClick={() => ctx.go("outfit-alternative")}
                    className="shine-style-0199"
                  >
                    <Img
                      src={variant.image}
                      alt={variant.label}
                      className="shine-style-0200"
                    />
                    <div className="shine-style-0201">
                      <div
                        className="shine-style-0202"
                      >
                        {variant.label}
                      </div>
                      <div
                        className="shine-style-0203"
                      >
                        {variant.sub}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="shine-style-0204">
            <Btn
              full
              onClick={() =>
                ctx.isAuth ? ctx.go("save-success") : ctx.go("save-guest")
              }
            >
              Сохранить образ
            </Btn>
            {editing ? (
              <Btn full variant="secondary" onClick={() => setEditing(false)}>
                Готово
              </Btn>
            ) : (
              <>
                <Btn full variant="secondary" onClick={() => setEditing(true)}>
                  Изменить
                </Btn>
                <Btn
                  full
                  variant="ghost"
                  onClick={() => ctx.go("outfit-alternative")}
                >
                  Другой вариант
                </Btn>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
