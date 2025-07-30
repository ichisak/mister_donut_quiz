FROM node:20

WORKDIR /app

COPY package*.json ./

COPY quiz.json ./quiz.json

COPY images ./images

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
