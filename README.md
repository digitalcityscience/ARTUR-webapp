# ARTUR

A web platform to support decision-making on the theme of urban resilience.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Local development

1. Set .env file
   - change the hostnames of the DB and the Server to localhost, if you are going to develop and run the two node apps without docker
2. Get DB running
   - start the postgis database on your local computer, preferrably via docker using the following command: `docker compose up db -d --build`
3. Start the two node apps locally:
   - go to the `dev` folder and use `npm run dev` to start the frontend, go to the `server` folder and use `npm start` to use the server.

## Preparing for docker and deployment

1. Set .env file:

- change the hostnames of the DB to artur-db and of the server to artur-server

2. change vite.config.ts and db.js, delete `dotenv.config({ path: "../.env" });`

3. Start the services:

- start the services with `docker compose up -d --build`
