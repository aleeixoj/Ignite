FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g yarn --force

RUN yarn install

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]