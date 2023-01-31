FROM node:16 as builder
ARG env=prod
WORKDIR /app/client
COPY ../apps/client/package*.json ./
RUN npm install
COPY . ../../
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/build /usr/share/nginx/html
