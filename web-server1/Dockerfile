FROM node:22.1.0-bullseye-slim

WORKDIR /app

 #dependencies

 COPY package*.json ./

 RUN npm install

#copy enitre project
EXPOSE 3000

COPY . .

CMD [ "node","index.js" ]