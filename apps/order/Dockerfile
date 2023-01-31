FROM node:16-alpine as dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build order

FROM node:16-alpine as prod
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
ADD package*.json ./
RUN apk add curl
RUN npm install --only=prod
COPY --from=dev /opt/app/dist/apps/order ./dist

CMD [ "node","./dist/main" ]

