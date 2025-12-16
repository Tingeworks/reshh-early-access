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

# Install dependencies for preview (need vite)
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Copy built assets from builder (TanStack Start outputs to .output, standard Vite to dist)
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Use preview server for production
CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port 3000"]


