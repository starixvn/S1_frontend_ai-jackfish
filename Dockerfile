
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app

ARG project_name
ARG env
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY ./apps/${project_name}/.env.${env} ./apps/${project_name}/.env

RUN npx nx build $project_name

FROM base AS runner
WORKDIR /app

ARG project_name
ARG port

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/${project_name}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/${project_name}/.next/static ./dist/apps/${project_name}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/${project_name}/public ./apps/${project_name}/public

USER nextjs

ENV APP_PATH=apps/${project_name}/server.js

EXPOSE ${port}
ENV PORT ${port}

CMD node $APP_PATH


