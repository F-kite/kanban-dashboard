# kanban-dashboard

Веб-приложение для управления задачами в формате Kanban-доски

## Возможности

- Просмотр задач с фильтрацией по статусу: `todo` / `in progress` / `done`
- Приоритеты задач: низкий, средний, высокий
- Создание задач с заголовком, описанием, статусом и приоритетом
- Глобальное состояние на Redux Toolkit с асинхронной загрузкой данных
- Анимации интерфейса через GSAP

## Стек технологий

| Часть | Технологии |
|---|---|
| Frontend | React 19, TypeScript, Vite, Redux Toolkit, Tailwind CSS, GSAP, Axios |
| Backend | Node.js, Express 5, TypeScript, Supabase (PostgreSQL) |
| Инфраструктура | Docker, Docker Compose |

## Быстрый старт

### Docker Compose (рекомендуется)

```bash
docker-compose up -d
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

### Локально

**Backend**
```bash
cd server
npm install
npm run dev
```

**Frontend**
```bash
cd client
npm install
npm run dev  
```

### Переменные окружения

Создать файл `server/.env`:

```env
SUPABASE_PROJECT_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
SUPABASE_ACCESS_TOKEN=your_access_token
```

## API

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/api/posts` | Список всех задач |
| `POST` | `/api/posts` | Создать задачу |
| `PUT` | `/api/posts/:id` | Обновить задачу |
| `DELETE` | `/api/posts/:id` | Удалить задачу |
| `GET` | `/api/users/:id` | Получить пользователя |
| `POST` | `/api/users` | Создать пользователя |
| `GET` | `/api/ping` | Health check |
