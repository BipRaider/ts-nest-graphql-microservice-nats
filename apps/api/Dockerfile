FROM node:16-alpine AS development
WORKDIR /usr/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build api

FROM node:16-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/app
ADD package*.json ./
ADD schema.gql ./schema.gql
RUN npm install --only=production
COPY --from=development /usr/app/dist/apps/api ./dist

CMD [ "node","./dist/main" ]
