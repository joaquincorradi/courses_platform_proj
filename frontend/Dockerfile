FROM node:20-alpine

WORKDIR /app

COPY package.json .

<<<<<<< HEAD
ENV NODE_OPTIONS=--max_old_space_size=2048
=======
ENV NODE_OPTIONS=--max_old_space_size=4096
>>>>>>> backend-dev

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]