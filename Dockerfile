FROM node:16.18.0

ADD . /app
WORKDIR /app
RUN --mount=type=secret,id=certificate \
          cat /run/secrets/certificate >> /app/ca-certificate.crt

RUN yarn install && yarn build

CMD ["yarn","start"]
