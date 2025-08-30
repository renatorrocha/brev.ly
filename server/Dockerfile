  FROM node:22.15.1-slim AS base
  RUN corepack enable
  
  FROM base AS dependencies
  WORKDIR /usr/src/app
  
  COPY package*.json pnpm-lock.yaml ./
  RUN pnpm i --frozen-lockfile
  
  FROM base AS build
  WORKDIR /usr/src/app
  
  COPY . .
  COPY --from=dependencies /usr/src/app/node_modules ./node_modules
  COPY --from=dependencies /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
  COPY --from=dependencies /usr/src/app/package.json ./package.json
  
  RUN pnpm run build
  
  FROM cgr.dev/chainguard/node AS deploy
  USER 1000
  WORKDIR /usr/src/app
  

  COPY --from=build /usr/src/app/dist ./dist
  COPY --from=build /usr/src/app/node_modules ./node_modules
  COPY --from=build /usr/src/app/package.json ./package.json
  COPY --from=build /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
  
  EXPOSE ${PORT}
  ENTRYPOINT ["node"]
  CMD ["dist/server.cjs"]
  