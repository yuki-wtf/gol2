FROM node:16.18.0

ENV NODE_ENV production

WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN yarn install
COPY --chown=node:node . .
RUN yarn build

CMD ["yarn","start"]
