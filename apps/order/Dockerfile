FROM node:16-alpine as dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm i glob rimraf
RUN npm i
COPY . .
RUN npm run build order

FROM node:16-alpine as prod
WORKDIR /opt/app
ADD package*.json ./
RUN apk add curl
RUN npm i --only=prod
COPY --from=dev /opt/app/dist/apps/order ./dist

CMD [ "node","./dist/main" ]


