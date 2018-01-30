# API Boilerplate

[![Build Status](https://travis-ci.org/Wiredcraft/api-boilerplate.svg?branch=master)](https://travis-ci.org/Wiredcraft/api-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/api-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/api-boilerplate?branch=master)

Boilerplate for a (Node.js based) API or web service.

## How to use

Copy whatever you need.

## What's included/used

## Dockers

- Install and start [Docker for Mac](https://docs.docker.com/docker-for-mac/).
- For reference see [docker-compose](https://docs.docker.com/compose/reference/overview/).

### Start

```bash
make docker-start
```

### Retart

```bash
make docker-restart
```

### Shutdown and cleanup

```bash
make docker-stop
make docker-flush
```

## Boxes

- [Couchbase](https://hub.docker.com/_/couchbase/)


### Modules

```bash
# Core
yarn add bluebird debug
# Config
yarn add env-var lodash.merge
# Core Loopback
yarn add loopback loopback-extended-lib
# Core Middlewares
yarn add helmet serve-favicon strong-error-handler strong-remoting
# Loggers
yarn add bunyan bunyan-debug-stream bunyan-logger express-bunyan-logger syslog-bunyan-logger
# DB / Datasource
yarn add loopback-connector loopback-datasource-juggler
# Mixins
yarn add loopback-ds-timestamp-mixin
# Tools
yarn add http-errors uuid
# Lint
yarn add --dev eslint eslint-config-wcl-backend
# Dev
yarn add --dev coveralls istanbul mocha nodemon should supertest
```
