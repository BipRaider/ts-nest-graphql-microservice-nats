FROM node:16-alpine as dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm i -g rimraf
RUN npm i
COPY . .
RUN npm run build user

FROM node:16-alpine as prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
ADD package*.json ./
RUN apk add curl
RUN npm i --only=prod
COPY --from=dev /opt/app/dist/apps/user ./dist

CMD [ "node","./dist/main" ]
