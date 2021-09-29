FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g yarn --force

RUN yarn install

COPY . .

EXPOSE 3334

CMD ["yarn", "dev"]