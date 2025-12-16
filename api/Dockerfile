FROM node:22-alpine AS builder

WORKDIR /app

# Install deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Copy source and build
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
COPY test ./test

RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["pnpm", "start:prod"]


