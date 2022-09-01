FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/app .

ARG PORT=3333

EXPOSE ${PORT}

RUN npm install --omit=dev

RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express

ENTRYPOINT [ "node", "main.js" ]