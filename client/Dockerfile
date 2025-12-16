FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install dependencies (need all deps for Nitro server)
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy built assets from builder (TanStack Start with Nitro outputs to .output)
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Run Nitro production server (TanStack Start uses Nitro)
CMD ["sh", "-c", "node .output/server/index.mjs"]


