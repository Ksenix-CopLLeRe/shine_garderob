# Shine MCP-сервер

MCP-сервер (Model Context Protocol) для гардероба Shine. Через него ИИ-ассистент (Claude Desktop, Claude Code и другие MCP-клиенты) видит вещи пользователя, собирает из них образы и сохраняет их.

Образ подбирает сама модель ассистента. Сервер отдаёт данные гардероба и проверяет, что сохраняемый образ корректен. API-ключ не нужен: при работе через Claude Desktop расходуются обычные лимиты подписки.

## Архитектура

```
Claude Desktop ──stdio/MCP──▶ src/index.ts
                                 └─ createServer()  src/server.ts   (не зависит от транспорта)
                                      ├─ tools/      инструменты (zod-валидация входа)
                                      ├─ prompts/    сценарий «Собрать образ»
                                      ├─ domain/     типы, справочник, правила образа
                                      └─ storage/    WardrobeRepository → SQLite (data/shine.db)
                                                     ImageStorage → data/images/

Приложение Shine ──HTTP──▶ src/http/main.ts  (GET/DELETE /api/items[/:id], /api/outfits[/:id], GET /images/*)
```

- Все данные привязаны к `userId`. Для stdio пользователь задаётся переменной `SHINE_USER_ID`.
- Хранилище скрыто за интерфейсом `WardrobeRepository`, поэтому SQLite можно заменить на Postgres без изменений в инструментах.
- Схема БД версионируется миграциями (`PRAGMA user_version`).
- Справочник (`src/domain/catalog.ts`) совпадает со значениями из `src/data/` в приложении.

## Инструменты

| Инструмент | Что делает |
|---|---|
| `list_wardrobe_items` | вещи гардероба, фильтры: категория, сезон, стиль, цвет |
| `get_wardrobe_item` | карточка вещи с фото |
| `add_wardrobe_item` / `update_wardrobe_item` / `remove_wardrobe_item` | управление гардеробом |
| `add_item_from_photo` | добавить вещь с фото из локального файла (JPG/PNG/WebP/HEIC до 15 МБ; HEIC конвертируется в JPEG на macOS) |
| `get_catalog` | категории, сезоны, ситуации, стили |
| `get_style_profile` / `set_style_profile` | любимые стили пользователя |
| `save_outfit` | сохранить образ (с проверкой: вещи есть в гардеробе, нет дублей категорий, есть основа) |
| `list_saved_outfits` / `get_outfit` / `delete_outfit` | сохранённые образы |

Prompt `create_outfit(situation, weather?)` — готовый сценарий подбора образа.

## Установка

```bash
cd mcp-server
npm install
npm run build
npm run seed     # демо-гардероб на основе моков приложения
npm test
```

| Переменная | По умолчанию |
|---|---|
| `SHINE_DB_PATH` | `mcp-server/data/shine.db` |
| `SHINE_USER_ID` | `demo` |
| `SHINE_IMAGES_DIR` | `mcp-server/data/images` |
| `SHINE_HTTP_PORT` | `8787` |
| `SHINE_PUBLIC_URL` | `http://localhost:8787`, по этому адресу формируются ссылки на фото |

## Приложение с реальными данными

```bash
cd mcp-server && npm run api   # API на http://localhost:8787
cd .. && npm run dev           # приложение на http://localhost:8443
```

Экраны «Гардероб», «Образы», карточка вещи, карточка образа, главная и удаление работают через API.
С телефона в той же Wi-Fi сети откройте `http://<IP компьютера>:8443`: приложение само обращается к API на том же хосте.
Фото в БД хранятся как ключи (`demo/<uuid>.jpg`), полный URL собирается при отдаче. Если API не запущен (например, в превью Figma Make), показываются моки.
Адрес API в приложении можно поменять переменной `VITE_SHINE_API_URL`.

## Добавить вещь по фото

В Claude Desktop приложите фото вещи и напишите, например:
«Добавь эту вещь в мой гардероб, файл лежит в ~/Downloads/jacket.jpg».
Claude сам определит по фото категорию, цвета и стиль, а сервер скопирует файл в `data/images/`.

## Подключение к Claude Desktop

1. Узнайте путь к node: `which node`.
2. Claude Desktop → Settings → Developer → Edit Config. Откроется `~/Library/Application Support/Claude/claude_desktop_config.json`. Добавьте:

```json
{
  "mcpServers": {
    "shine": {
      "command": "/usr/local/bin/node",
      "args": ["/Users/gulsim/shine_garderob/mcp-server/dist/index.js"],
      "env": { "SHINE_USER_ID": "demo" }
    }
  }
}
```

3. Полностью перезапустите Claude Desktop (⌘Q). В чате, в меню инструментов, появится `shine`.
4. Попросите: «Собери мне образ на учёбу, на улице +10 и дождь, и сохрани его». Или выберите prompt «Собрать образ» в меню «+».

Логи сервера: `~/Library/Logs/Claude/mcp-server-shine.log`.

## Отладка

```bash
npm run inspect   # MCP Inspector в браузере: можно вызывать инструменты вручную
```

## Дальше

- Streamable HTTP-транспорт + OAuth: подключение как remote connector и много пользователей.
- Postgres-реализация `WardrobeRepository`.
- REST API поверх того же репозитория, чтобы React-приложение работало с теми же данными вместо моков.
