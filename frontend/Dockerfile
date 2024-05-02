FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g vite

RUN npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]