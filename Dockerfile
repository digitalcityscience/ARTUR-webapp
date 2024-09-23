FROM node AS base

WORKDIR /app

FROM base AS server

COPY server ./server

WORKDIR /app/server

RUN npm install

EXPOSE 3000

FROM base AS dev

COPY dev ./dev

WORKDIR /app/dev

RUN npm install

EXPOSE 5173