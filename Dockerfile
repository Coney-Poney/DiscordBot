# specify the node base image with your desired version node:<version>
FROM node:16
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]