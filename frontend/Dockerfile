FROM node:20-alpine

WORKDIR /app

COPY package.json .

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]