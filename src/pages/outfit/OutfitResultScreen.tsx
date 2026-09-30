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
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0D0D0D",
      }}
    >
      <StatusBar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 24px",
        }}
      >
        <BackBtn onClick={() => ctx.back()} />
        <Caption>{editing ? "Редактирование образа" : "Образ"}</Caption>
        <div style={{ width: 36, height: 36 }} />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }} className="scrollbar-hide">
        {editing && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              background: "#241216",
              borderTop: "1px solid #6B1F2B",
              borderBottom: "1px solid #6B1F2B",
            }}
          >
            <div style={{ width: 5, height: 5, background: "#8B2D3B" }} />
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#F3F0E9",
                letterSpacing: "0.04em",
              }}
            >
              Режим редактирования · заменить или удалить вещь
            </div>
          </div>
        )}
        <div style={{ padding: "8px 16px 12px" }}>
          <div style={{ display: "flex", gap: 8, height: 220 }}>
            <OutfitPiece
              src={IMGS.itemCoat}
              alt="Бежевый тренч"
              style={{ flex: 1.3, height: "100%" }}
              editing={editing}
              removed={isRemoved("coat")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("coat")}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <OutfitPiece
                src={IMGS.itemWhiteShirt}
                alt="Белая рубашка"
                style={{ flex: 1 }}
                editing={editing}
                removed={isRemoved("shirt")}
                onReplace={() => ctx.go("replace-item")}
                onRemove={() => removePiece("shirt")}
              />
              <OutfitPiece
                src={IMGS.itemBlackJeans}
                alt="Прямые джинсы"
                style={{ flex: 1 }}
                editing={editing}
                removed={isRemoved("jeans")}
                onReplace={() => ctx.go("replace-item")}
                onRemove={() => removePiece("jeans")}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, height: 110, marginTop: 8 }}>
            <OutfitPiece
              src={IMGS.itemLoafers}
              alt="Лоферы"
              style={{ flex: 1 }}
              editing={editing}
              removed={isRemoved("loafers")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("loafers")}
            />
            <OutfitPiece
              src={IMGS.itemBlackBag}
              alt="Кожаная сумка"
              style={{ flex: 0.75 }}
              editing={editing}
              removed={isRemoved("bag")}
              onReplace={() => ctx.go("replace-item")}
              onRemove={() => removePiece("bag")}
            />
          </div>
        </div>

        <Divider />

        <div style={{ padding: "20px 24px 32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 400,
                color: "#F3F0E9",
                flex: 1,
                marginRight: 12,
              }}
            >
              Дождливый вторник
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#5A5855",
                }}
              >
                Учёба
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#5A5855",
                }}
              >
                +14°
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#8A8680",
              lineHeight: 1.65,
              marginBottom: 24,
            }}
          >
            Практичный образ под дождь — тренч защитит от погоды, а базовые вещи
            дадут свободу движений.
          </div>
          {editing && (
            <div style={{ marginBottom: 24 }}>
              <Caption style={{ marginBottom: 12 }}>Варианты образа</Caption>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  paddingBottom: 4,
                }}
                className="scrollbar-hide"
              >
                {changeVariants.map((variant) => (
                  <button
                    key={variant.label}
                    onClick={() => ctx.go("outfit-alternative")}
                    style={{
                      width: 112,
                      flexShrink: 0,
                      padding: 0,
                      background: "#121212",
                      border: "1px solid #2A2A2A",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <Img
                      src={variant.image}
                      alt={variant.label}
                      style={{ width: "100%", height: 78 }}
                    />
                    <div style={{ padding: "8px 8px 9px" }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10,
                          color: "#F3F0E9",
                          lineHeight: 1.25,
                        }}
                      >
                        {variant.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 9,
                          color: "#6A6865",
                          lineHeight: 1.3,
                          marginTop: 3,
                        }}
                      >
                        {variant.sub}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
