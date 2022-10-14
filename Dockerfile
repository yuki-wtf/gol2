FROM node:16.18.0

ADD . /app
WORKDIR /app

RUN yarn install && yarn build

CMD ["yarn","start"]
