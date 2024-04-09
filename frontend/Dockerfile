FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g vite

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]