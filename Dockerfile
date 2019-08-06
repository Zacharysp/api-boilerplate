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

# Capture BUILD params as env
ARG OMNI_COMPONENT=boilerplate
ARG OMNI_COMPONENT_VERSION=unknown
ARG OMNI_COMPONENT_COMMIT=unknown
ENV OMNI_COMPONENT ${OMNI_COMPONENT}
ENV OMNI_COMPONENT_VERSION ${OMNI_COMPONENT_VERSION}
ENV OMNI_COMPONENT_COMMIT ${OMNI_COMPONENT_COMMIT}

# Default instances count to 0 to use as many as there is CPU cores on the host
ENV PM2_WORKER_INSTANCES 0
ENV PM2_NAME ${OMNI_COMPONENT}
CMD [ "sh", "-c", "pm2-runtime --json --name ${PM2_NAME} --instances ${PM2_WORKER_INSTANCES} server/server.js" ]

