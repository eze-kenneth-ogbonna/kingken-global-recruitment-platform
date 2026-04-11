# Setup Guide

This guide walks you through setting up the Kingken Global Recruitment Platform on your local machine for development.

---

## 📋 Prerequisites

Before you begin, ensure the following tools are installed on your system:

| Tool | Minimum Version | Purpose |
|---|---|---|
| Node.js | 18.x LTS | JavaScript runtime for the backend and frontend |
| npm or yarn | npm 9.x / yarn 1.22+ | Package manager |
| PostgreSQL | 15.x | Primary relational database |
| Git | 2.x | Version control |

### Installing Prerequisites

- **Node.js**: Download from [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm)
- **PostgreSQL**: Download from [postgresql.org](https://www.postgresql.org/download/) or use a managed service
- **Git**: Download from [git-scm.com](https://git-scm.com/)

Verify your installations:

```bash
node --version    # Should output v18.x.x or higher
npm --version     # Should output 9.x.x or higher
psql --version    # Should output 15.x or higher
git --version
```

---

## 📦 Cloning the Repository

```bash
git clone https://github.com/eze-kenneth-ogbonna/kingken-global-recruitment-platform.git
cd kingken-global-recruitment-platform
```

---

## 📥 Installing Dependencies

At the moment, this repository does not include runnable Node.js application packages at the root, `backend/`, or `frontend/` level, so there are currently no `package.json` files for `npm install` to use in those locations.

Because of that, you should **not** run `npm install` in the root, `backend/`, or `frontend/` directories yet.

Once the backend and frontend application code is added with their corresponding `package.json` manifests, installation steps for those directories will be documented here.

For now, after cloning the repository, continue with the environment configuration steps below to prepare your local setup for future development work:

```bash
cp .env.example .env
```

---

## 🔐 Setting Up Environment Variables

The platform uses environment variables for all sensitive configuration. Create a `.env` file in the project root for your local development settings.

1. Create your local environment file:

```bash
touch .env
```

2. Open `.env` in your editor and fill in the required values:

```env
# Database
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/kingken_dev

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here

# API Keys
SENDGRID_API_KEY=your_sendgrid_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Application
NODE_ENV=development
PORT=3000
```

> **Note:** Never commit your `.env` file to version control. It is already excluded in `.gitignore`.

---

## 🗄 Database Setup

### 1. Create the database

Connect to PostgreSQL and create the development database:

```bash
psql -U postgres -c "CREATE DATABASE kingken_dev;"
```

### 2. Run migrations

Apply all schema migrations using Prisma:

```bash
npx prisma migrate deploy
```

### 3. Seed the database

Populate the database with development seed data:

```bash
npx prisma db seed
```

---

## 🚀 Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`
- **API Docs (Swagger)**: `http://localhost:3000/api/docs`

---

## 🧪 Running Tests

Run the full test suite:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

Run tests with coverage report:

```bash
npm run test:coverage
```

---

## 🛠 Useful Scripts

| Script | Command | Description |
|---|---|---|
| Development server | `npm run dev` | Start all services in development mode with hot reload |
| Build | `npm run build` | Compile TypeScript and build production assets |
| Lint | `npm run lint` | Run ESLint across the codebase |
| Lint fix | `npm run lint:fix` | Auto-fix linting issues where possible |
| Test | `npm run test` | Run the full test suite |
| DB migrate | `npx prisma migrate dev` | Create and apply a new database migration |
| DB seed | `npx prisma db seed` | Populate database with seed data |
| DB studio | `npx prisma studio` | Open a visual database browser at `http://localhost:5555` |

---

## 🔧 Troubleshooting

### `DATABASE_URL` connection error

**Error:** `Error: P1001: Can't reach database server at localhost:5432`

**Fix:** Ensure PostgreSQL is running and that the credentials in your `.env` file match your local PostgreSQL setup.

```bash
# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql

# Start PostgreSQL (Ubuntu/Debian)
sudo service postgresql start
```

---

### Port already in use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Fix:** Find and stop the process using that port:

```bash
# Find the process
lsof -i :3000

# Kill it (replace <PID> with the actual process ID)
kill <PID>
```

---

### `npx prisma migrate deploy` fails

**Fix:** Ensure the database exists and that `DATABASE_URL` in your `.env` is correct. Then try:

```bash
npx prisma migrate reset   # WARNING: this will drop and recreate the database
```

---

### Node.js version mismatch

**Fix:** Use `nvm` to switch to the required Node.js version:

```bash
nvm install 18
nvm use 18
```

---

## 🔗 Related Documentation

- [`DEVELOPMENT.md`](../DEVELOPMENT.md) — Contribution guidelines and coding standards
- [`ARCHITECTURE.md`](../ARCHITECTURE.md) — Platform architecture overview
- [`ops/ROLLOUT_CHECKLIST.md`](../ops/ROLLOUT_CHECKLIST.md) — Pre-deployment checklist
- [`infrastructure/TECH_STACK.md`](../infrastructure/TECH_STACK.md) — Full technology stack reference