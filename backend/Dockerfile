FROM node:24-alpine AS runtime

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY prisma ./prisma
RUN npx prisma generate --schema prisma/schema.prisma

COPY src ./src

RUN mkdir -p /app/data /app/uploads

ENV NODE_ENV=production
ENV PORT=3001
ENV DATABASE_URL=file:/app/data/dev.db

EXPOSE 3001

CMD ["node", "src/index.js"]
