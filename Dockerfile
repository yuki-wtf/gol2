FROM node:16.18.0
WORKDIR /app
COPY . .
RUN yarn install && yarn build

CMD ["yarn","start"]
