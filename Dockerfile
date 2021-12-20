FROM node:17-alpine AS builder

WORKDIR /work

RUN npm i -g pnpm

COPY ./package.json /work/package.json

RUN pnpm install

COPY . /work

RUN pnpm build

FROM caddy:2-alpine

COPY --from=builder /work/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /work/dist /usr/share/caddy

EXPOSE 8080