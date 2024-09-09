FROM node AS base

WORKDIR /app

COPY . ./

RUN npm install

FROM base AS server

EXPOSE 3000

FROM base AS dev

EXPOSE 5173