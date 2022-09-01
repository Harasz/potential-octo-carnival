FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/catalog .

COPY ./libs/db-client/prisma ./prisma/

ARG PORT=3334

EXPOSE ${PORT}

RUN npm install --omit=dev

RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express @prisma/client

RUN npx prisma generate

ENTRYPOINT [ "node", "main.js" ]