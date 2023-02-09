FROM node:16-alpine AS dev
WORKDIR /opt/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build admin

# Prod
FROM node:16-alpine AS prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

ADD package*.json ./
ADD schema.gql ./schema.gql

RUN npm install --only=prod

COPY --from=dev /opt/app/dist/apps/admin ./dist

CMD [ "node","./dist/main" ]
