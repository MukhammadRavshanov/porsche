# Porsche International — Official Fullstack Web Platform

Официальный полнофункциональный веб-сайт Porsche в стиле [porsche.com/international](https://www.porsche.com/international/).

---

## 🏎️ Архитектура проекта

Проект разделен на две независимые папки в соответствии с требованиями:

- **`backend/`** — REST API сервер на **Node.js (Express)**:
  - `GET /api/models` — модельный ряд (911 GT3 RS, 911 Carrera GTS, Taycan Turbo GT, 718 Cayman GT4 RS, Panamera Turbo E-Hybrid, Macan Turbo Electric, Cayenne Turbo E-Hybrid) с полными ТТХ (л.с., 0-100, Vmax), заводскими цветами, колесными дисками и пакетами опций.
  - `GET /api/models/:id` — детальные параметры конкретной модели.
  - `GET /api/inventory` — каталог автомобилей **Porsche Finder** (новые и сертифицированные автомобили *Porsche Approved* с гарантией 24 месяца и проверкой по 111 пунктам).
  - `GET /api/dealers` — официальные дилерские центры Porsche Centres по всему миру (Штутгарт, Мюнхен, Лондон, Париж, Цюрих, Дубай, Манхэттен, Токио).
  - `GET /api/shop/products` — коллекция аксессуаров Porsche Lifestyle (хронографы Porsche Design, одежда Porsche Motorsport, багаж, масштабные модели 1:18, саундбар 911).
  - `POST /api/shop/checkout` — оформление заказов в корзине.
  - `POST /api/test-drive` — бронирование тест-драйва с присвоением номера брони (`PORSCHE-TD-XXXXXX`).
  - `GET /api/experiences` — программы трек-дней, музей в Цуффенхаузене и гоночные серии (Le Mans 24h, Formula E).

- **`frontend/`** — ультра-быстрое клиентское приложение на **React 18 + Vite + Tailwind CSS + Lucide Icons**:
  - **Главная страница (Home)**: роскошный Hero-баннер 911 GT3 RS, синтезатор звука оппозитного 6-цилиндрового двигателя (9,000 RPM) через Web Audio API, интерактивный фильтр моделей (All, Electric, E-Hybrid, Petrol), витрина Porsche Approved, истории автоспорта и магазин.
  - **Каталог моделей (Models)**: фильтрация по сериям (718, 911, Taycan, Panamera, Macan, Cayenne), сравнение характеристик до 3 моделей бок о бок (*Side-by-Side Comparison*).
  - **Интерактивный конфигуратор (Car Configurator)**:
    - 3D-визуализатор с живой сменой оригинальных оттенков Porsche (Guards Red, Racing Yellow, GT Silver, Shark Blue, Chalk, Turbonite и др.) с отражением на кузове.
    - Выбор колесных дисков (RS Spyder, Weissach Magnesium, Exclusive Carbon).
    - Выбор отделки салона (Race-Tex, Club Leather Truffle Brown, Bordeaux Red).
    - Опции: Weissach Package, карбон-керамические тормоза PCCB с желтыми суппортами, акустика Burmester 3D, лифт передней оси.
    - Динамический пересчет стоимости в реальном времени.
    - Сохранение конфигурации в личный гараж и генерация спецификации (*Spec Sheet*).
  - **Porsche Finder (Inventory)**: расширенный поиск с ползунком цены, фильтрами по типу привода, пробегу, году и наличию сертификата *Porsche Approved*.
  - **Локатор дилеров (Dealers & Test Drive)**: поиск центров по городам, прямая запись на тест-драйв с модальным окном подтверждения.
  - **Porsche Shop**: каталог аксессуаров, интерактивная корзина с выдвижной шторкой (*Cart Drawer*), контроль количества и чекаут.
  - **Experience & Heritage**: история марки с 1948 года (356 "No. 1", 911, 917 Le Mans, 959, 918 Spyder, Taycan), гоночные программы Le Mans и Formula E.
  - **Личный гараж (Saved Builds)**: сохраненные сборки с возможностью продолжения кастомизации.

---

## 🚀 Запуск проекта

### Вариант 1 (В один клик на Windows):
Дважды нажмите на файл **`start.bat`** в корне папки `porsche`. Скрипт автоматически запустит бэкенд на порту 5000, фронтенд на порту 3000 и откроет браузер.

### Вариант 2 (Через терминал):

1. **Запуск Backend**:
   ```bash
   cd backend
   npm start
   ```
   Сервер запустится на: `http://localhost:5000` (проверка: `http://localhost:5000/api/health`)

2. **Запуск Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   Сайт откроется на: `http://localhost:3000`

---

## 🎨 Замена картинок и кастомизация
Все изображения и карточки настроены с высококачественными автомобильными превью. Если вы хотите подключить свои фотографии:
- Для карточек моделей: отредактируйте `backend/src/data/models.json` (поля `heroImage` и `gallery`).
- Для инвентаря Finder: отредактируйте `backend/src/data/inventory.json` (поле `image`).
- Для магазина: отредактируйте `backend/src/data/shop.json` (поле `image`).
- Также можно положить локальные файлы в `frontend/public/images/` и ссылаться на `/images/ваш_файл.jpg`.
