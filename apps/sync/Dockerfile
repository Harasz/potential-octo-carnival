FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/sync .

COPY ./libs/db-client/prisma ./prisma/

ARG PORT=3335

EXPOSE ${PORT}

RUN npm install --omit=dev

RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express @prisma/client

RUN npx prisma generate

CMD npx prisma migrate deploy && node main.js