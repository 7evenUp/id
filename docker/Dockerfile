
FROM node:20-alpine AS build

WORKDIR /app

COPY . .
COPY env.txt ./.env

RUN npm install
RUN npm run build

FROM nginx:stable-alpine AS production

RUN apk update
RUN apk upgrade
RUN apk add curl busybox-extras shadow supervisor

RUN mkdir /etc/supervisor.d/
COPY docker/supervisor/supervisor.conf /etc/supervisor.d/supervisor.ini
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/health-check.conf /etc/nginx/conf.d/health-check.conf

WORKDIR /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

COPY --chown=nginx:nginx --from=build /app/dist /usr/share/nginx/html

ENV TZ "Europe/Moscow"

CMD ["/usr/bin/supervisord"]

HEALTHCHECK --start-period=10s --interval=10s --timeout=5s --retries=3 CMD curl -f http://127.0.0.1:1000/health-check || exit 1

EXPOSE 3000
