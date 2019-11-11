FROM node:8.10

WORKDIR /app

RUN npm install -g zapier-platform-cli

COPY ./package.json .
RUN npm install
