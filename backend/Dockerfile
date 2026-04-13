# ── Stage 1: install deps and generate Prisma client ──────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY prisma ./prisma
RUN npx prisma generate --schema prisma/schema.prisma

# ── Stage 2: lean production image ─────────────────────────────────────────────
FROM node:24-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src

RUN mkdir -p /app/data /app/uploads

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=file:/app/data/dev.db

EXPOSE 3001

CMD ["node", "src/index.js"]
