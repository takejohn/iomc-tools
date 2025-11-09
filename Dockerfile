# ==========================================================
#  Stage 1: Builder
# ==========================================================
FROM node:22-bookworm AS builder

# pnpmをグローバルインストール
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# 依存定義ファイルを先にコピーしてキャッシュを活用
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json packages/backend/
COPY packages/frontend/package.json packages/frontend/

# 依存インストール（全ワークスペース）
RUN pnpm install --frozen-lockfile

# ソースをコピーしてビルド
COPY . .

# フロント＆バック両方をビルド
RUN pnpm run build

# ==========================================================
#  Stage 2: Runtime
# ==========================================================
FROM node:22-slim AS runner

# pnpmを有効化
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# builderから必要な成果物のみコピー
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/backend/package.json packages/backend/
COPY --from=builder /app/packages/frontend/package.json packages/frontend/
COPY --from=builder /app/packages/backend/dist packages/backend/dist
COPY --from=builder /app/packages/frontend/dist packages/frontend/dist

# 実行に必要な依存だけインストール
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 環境変数設定
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app/packages/backend

EXPOSE 3000

# Fastifyサーバー起動
CMD ["node", "dist/index.js"]
