FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173
EXPOSE 3000

CMD ["sh", "-c", "npm start & npm run dev"]