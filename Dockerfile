FROM node:16.18.0
RUN apt-get update && apt-get upgrade -y
ENV NODE_ENV production

WORKDIR /app
RUN chown -R node:node /app
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .
RUN yarn build

CMD ["yarn","start"]
