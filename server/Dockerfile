FROM node:latest

WORKDIR /usr/app

RUN npm install -g @nestjs/cli

COPY package*.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["npm","run","start:prod"]