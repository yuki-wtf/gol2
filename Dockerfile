FROM node:16.15.1 as build

RUN yarn install && yarn build

FROM node:16.15.1

RUN mkdir /app
COPY --from=build . /app
WORKDIR /app

CMD ["yarn","start"]
