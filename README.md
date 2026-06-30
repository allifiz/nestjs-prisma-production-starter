# NestJS Prisma Production Starter

Production-ready starter template for building REST APIs with NestJS, Prisma, PostgreSQL, JWT authentication, role-based access control, Swagger, Docker, and a clean response structure.

## Features

- NestJS REST API structure
- Prisma ORM with PostgreSQL
- JWT authentication
- Register, login, and profile endpoint
- Role-based access control using `ADMIN` and `USER`
- Protected user management endpoint
- Global validation pipe
- Global response interceptor
- Global HTTP exception filter
- Swagger API documentation
- Docker and Docker Compose setup
- Prisma migration and seed admin user
- Clean folder structure for production projects

## Tech Stack

- Node.js
- NestJS
- Prisma
- PostgreSQL
- JWT
- Passport
- Swagger
- Docker

## Folder Structure

```txt
src/
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── types/
│   └── utils/
├── modules/
│   ├── auth/
│   ├── health/
│   ├── prisma/
│   └── users/
├── app.module.ts
└── main.ts

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/allifiz/nestjs-prisma-production-starter.git
cd nestjs-prisma-production-starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

```bash
cp .env.example .env
```

Adjust the database URL if needed.

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nest_starter?schema=public
JWT_SECRET=change_this_secret_in_production
JWT_EXPIRES_IN=1d
```

### 4. Start PostgreSQL with Docker

```bash
docker compose up -d postgres
```

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run migration

```bash
npm run prisma:migrate
```

### 7. Seed admin user

```bash
npm run prisma:seed
```

Default admin account:

```txt
Email: admin@example.com
Password: password123
```

### 8. Run development server

```bash
npm run start:dev
```

API will run at:

```txt
http://localhost:3000/api/v1
```

Swagger documentation:

```txt
http://localhost:3000/docs
```

## Running with Docker

Build and run the API with PostgreSQL:

```bash
docker compose up -d --build
```

Run seed after the container is up:

```bash
docker compose exec app npm run prisma:seed
```

## API Endpoints

### Health

```txt
GET /api/v1/health
```

### Auth

```txt
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

### Users

The users endpoint requires an `ADMIN` token.

```txt
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

## Example Login Request

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

## Example Authenticated Request

```bash
curl http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Useful Commands

```bash
npm run start:dev       # run development server
npm run build           # build production output
npm run start:prod      # run production server
npm run prisma:generate # generate Prisma client
npm run prisma:migrate  # create and run migration
npm run prisma:deploy   # deploy migration for production
npm run prisma:studio   # open Prisma Studio
npm run prisma:seed     # seed admin user
npm run format          # format source code
```

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Application port | `3000` |
| `APP_NAME` | Application name | `NestJS Prisma Production Starter` |
| `APP_URL` | Application URL | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection URL | required |
| `JWT_SECRET` | JWT signing secret | required |
| `JWT_EXPIRES_IN` | JWT expiration time | `1d` |
| `SEED_ADMIN_NAME` | Seed admin name | `Administrator` |
| `SEED_ADMIN_EMAIL` | Seed admin email | `admin@example.com` |
| `SEED_ADMIN_PASSWORD` | Seed admin password | `password123` |

## Production Notes

Before deploying to production:

- Replace `JWT_SECRET` with a strong secret.
- Replace default seed admin credentials.
- Use `npm run prisma:deploy` instead of `npm run prisma:migrate`.
- Keep `.env` out of Git.
- Put the API behind a reverse proxy such as Nginx.
- Enable HTTPS.

## License

MIT
