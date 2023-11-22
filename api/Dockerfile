FROM node:18

WORKDIR /server

COPY package*.json .

RUN npm install

COPY server.js .
COPY controllers ./controllers/
COPY middleware ./middleware/
COPY public ./public/
COPY routes ./routes/

EXPOSE 8080

CMD ["node", "server.js"]