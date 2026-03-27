# PC Builder

[Русский](#русский) | [English](#english)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-private-lightgrey)](https://github.com/scapegoatdekma/nextnext)

---

## Русский

### Описание

PC Builder — веб-приложение для подбора комплектующих и сохранения пользовательских сборок ПК.

Проект написан на `Next.js 16` с `App Router`, использует `Prisma` для работы с `PostgreSQL`, `NextAuth` для аутентификации по email и паролю и `Tailwind CSS` для интерфейса. Текущая версия ориентирована на локальную разработку и запуск в Docker.

### Возможности

- регистрация и вход пользователей
- создание и редактирование сборок ПК
- сохранение пользовательских сборок
- публикация сборок в общий каталог
- просмотр публичных сборок
- лайки для публичных сборок
- светлая и тёмная тема интерфейса

### Скриншоты

Скриншоты удобно хранить в каталоге `docs/screenshots/` и подключать в README относительными путями.

Пример структуры:

```text
docs/
  screenshots/
    home.png
    dashboard.png
    builds.png
```

Пример блока для вставки:

```md
![Главная страница](docs/screenshots/home.png)
![Конструктор сборки](docs/screenshots/dashboard.png)
![Список сборок](docs/screenshots/builds.png)
```

Если хочешь, я потом могу отдельно подготовить этот блок под реальные файлы скриншотов.

### Стек

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `NextAuth v5`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Docker` и `Docker Compose`

### Структура проекта

```text
app/
  api/auth/[...nextauth]/   маршруты аутентификации
  dashboard/                конструктор сборки
  builds/                   пользовательские и публичные сборки
  login/                    страница входа
  signup/                   страница регистрации
components/                 переиспользуемые UI-компоненты
lib/                        Prisma, типы и вспомогательные функции
prisma/                     схема, миграции, seed
```

### Требования

Перед запуском должны быть установлены:

- `Node.js 20+`
- `npm`
- `Docker` и `Docker Compose` — если база или приложение поднимаются в контейнерах

### Переменные окружения

Файл `.env.example` включён в репозиторий и может использоваться как шаблон.

Минимальный набор переменных:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/pcbuilder"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="pcbuilder"
RUN_SEED_ON_START="true"
```

### Локальный запуск

1. Установить зависимости:

```bash
npm install
```

2. Поднять PostgreSQL:

```bash
docker compose up -d postgres
```

3. Применить миграции:

```bash
npx prisma migrate deploy
```

Для локальной разработки допустим и такой сценарий:

```bash
npx prisma migrate dev
```

4. Заполнить базу тестовыми данными:

```bash
npx prisma db seed
```

5. Запустить приложение:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

### Запуск через Docker

Поднять проект целиком:

```bash
docker compose up --build
```

При старте контейнера приложения:

- выполняется `prisma migrate deploy`
- при `RUN_SEED_ON_START=true` автоматически запускается seed
- затем стартует production-сервер Next.js

Приложение будет доступно по адресу `http://localhost:3000`.

### Основные команды

```bash
npm run dev
npm run build
npm run start
npm run lint

npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma db seed
```

### Аутентификация

Аутентификация реализована через `NextAuth` с провайдером `Credentials`.

Текущая реализация:

- вход по email и паролю
- хранение пароля в захешированном виде
- стратегия сессии `jwt`
- пользовательские страницы входа и регистрации

### Модель данных

Основные сущности:

- `User`
- `Component`
- `Build`
- `BuildComponent`
- `Like`

Поддерживаемые типы комплектующих:

- `cpu`
- `gpu`
- `ram`
- `ssd`
- `motherboard`
- `psu`
- `case`
- `cooler`

### Production notes

- для production необходимо задать безопасный `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` должен соответствовать реальному домену приложения
- перед выкладкой стоит отключить `RUN_SEED_ON_START`, если автоматическое заполнение базы не требуется

---

## English

### Overview

PC Builder is a web application for selecting PC components and managing custom builds.

The project is built with `Next.js 16` using the `App Router`, relies on `Prisma` for database access, `PostgreSQL` as the primary data store, and `NextAuth` for email/password authentication. The current setup is intended for local development and Docker-based deployment.

### Features

- user registration and login
- PC build creation and editing
- saving user builds
- publishing builds to a public catalog
- browsing public builds
- likes for public builds
- light and dark theme support

### Screenshots

Recommended location for screenshots:

```text
docs/
  screenshots/
    home.png
    dashboard.png
    builds.png
```

Example README block:

```md
![Home](docs/screenshots/home.png)
![Build editor](docs/screenshots/dashboard.png)
![Build list](docs/screenshots/builds.png)
```

### Tech stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `NextAuth v5`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Docker` and `Docker Compose`

### Project structure

```text
app/
  api/auth/[...nextauth]/   authentication routes
  dashboard/                build editor
  builds/                   user and public builds
  login/                    login page
  signup/                   registration page
components/                 reusable UI components
lib/                        Prisma, types, helpers
prisma/                     schema, migrations, seed
```

### Requirements

Before running the project, make sure the following tools are installed:

- `Node.js 20+`
- `npm`
- `Docker` and `Docker Compose` if you plan to run the database or the app in containers

### Environment variables

The repository includes `.env.example`, which can be used as a starting point.

Minimum configuration:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/pcbuilder"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="pcbuilder"
RUN_SEED_ON_START="true"
```

### Local setup

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL:

```bash
docker compose up -d postgres
```

3. Apply migrations:

```bash
npx prisma migrate deploy
```

For development, this workflow is also acceptable:

```bash
npx prisma migrate dev
```

4. Seed the database:

```bash
npx prisma db seed
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Docker deployment

To run the project in containers:

```bash
docker compose up --build
```

At container startup, the application:

- runs `prisma migrate deploy`
- runs seed automatically if `RUN_SEED_ON_START=true`
- starts the production Next.js server

### Common commands

```bash
npm run dev
npm run build
npm run start
npm run lint

npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma db seed
```

### Authentication

Authentication is implemented with `NextAuth` using the `Credentials` provider.

Current behavior:

- email and password login
- hashed password storage
- `jwt` session strategy
- custom login and signup pages

### Data model

Core entities:

- `User`
- `Component`
- `Build`
- `BuildComponent`
- `Like`

Supported component types:

- `cpu`
- `gpu`
- `ram`
- `ssd`
- `motherboard`
- `psu`
- `case`
- `cooler`

### Production notes

- use a strong `NEXTAUTH_SECRET` in production
- `NEXTAUTH_URL` must match the actual deployment domain
- disable `RUN_SEED_ON_START` before production deployment if automatic seeding is not required
