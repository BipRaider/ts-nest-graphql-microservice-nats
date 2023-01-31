FROM node:16-alpine as dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
RUN npm run build api

FROM node:16-alpine as prod
WORKDIR /opt/app
ADD package*.json ./
ADD schema.gql ./schema.gql
RUN apk add curl
RUN npm install --only=prod
COPY --from=dev /opt/app/dist/apps/api ./dist

CMD [ "node","./dist/main" ]
