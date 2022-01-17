FROM node:14.18-alpine3.14
# Add java for firebase emulator.
RUN apk add openjdk11
# Install firebase tools.
RUN npm install -g firebase-tools@9.23.3 eslint babel-cli
# Add browser for angular karma testing.
RUN apk add chromium
# Chrome for running headless tests.
ENV CHROME_BIN /usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200 49153 9876 9099 8080 5000 4000
