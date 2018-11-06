FROM node:10-alpine as builder

# Add core packages to allow building native extensions
RUN apk add --no-cache make gcc g++ python

RUN npm install -g yarn

WORKDIR /src

COPY package.json yarn.lock /src/
RUN yarn install --production

COPY . /src



FROM node:10-alpine

RUN npm install -g pm2

WORKDIR /app

COPY --from=builder /src/ /app/
USER node

EXPOSE 3000

CMD [ "pm2-docker", "--json", "--instances", "0", "server/server.js" ]

