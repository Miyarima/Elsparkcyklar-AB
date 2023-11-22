FROM node:18

WORKDIR /server

COPY package*.json .

RUN npm install

COPY server.js .
COPY controllers ./controllers/
COPY public ./public/
COPY routes ./routes/
COPY src ./src/
COPY views ./views/

EXPOSE 1337

CMD ["node", "server.js"]