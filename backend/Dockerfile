## syntax=docker/dockerfile:1.7

# ── Stage 1: build stage - compile TypeScript and generate Prisma client ─────
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies (deterministic)
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# Copy TypeScript config and source
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

# Generate Prisma client and compile TypeScript
RUN npx prisma generate --schema prisma/schema.prisma
RUN npm run build

# ── Stage 2: production image with Prisma CLI for migration service ───────────
FROM node:24-alpine AS runtime

WORKDIR /app

# Copy package files and install locked dependencies.
# Prisma CLI remains available so docker-compose can run `prisma migrate deploy`
# before the backend accepts live traffic.
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# Copy compiled JavaScript and Prisma files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create necessary directories
RUN mkdir -p /app/data /app/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=file:/app/data/dev.db

EXPOSE 3001

# Run the compiled application
CMD ["node", "dist/server.js"]
