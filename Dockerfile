FROM node:14-alpine
# Add browser for angular karma testing.
RUN apk add chromium
ENV CHROME_BIN /usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 4200 49153 9876
