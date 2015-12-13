FROM node:4.1

ENV NODE_ENV production
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app

EXPOSE 3000
CMD node app.js
