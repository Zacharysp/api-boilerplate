# API Boilerplate

[![Build Status](https://travis-ci.org/Wiredcraft/api-boilerplate.svg?branch=master)](https://travis-ci.org/Wiredcraft/api-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/Wiredcraft/api-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/Wiredcraft/api-boilerplate?branch=master)

Boilerplate for a (Node.js based) API or web service.

## How to use

Copy whatever you need.

## What's included/used

### Docker boxes

See `/dockers/README.md`.

### Modules

```bash
# Core
yarn add bluebird debug
# Config
yarn add env-var-defaults
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

## Commit
Use [commitlint](https://github.com/marionebl/commitlint) with [@commitlint/config-conventional](https://github.com/marionebl/commitlint/blob/master/@commitlint/config-conventional/index.js)
for commit lint.

## How to create changelog
```
npm install -g conventional-changelog-cli
```
Workflow with `npm version`:
1. Make changes
2. Commit those changes
3. Pull all the tags
4. Run the `npm version [path|minor|major]` command
5. Push

## WCLError

### Envs
* `SENTRY_DSN`: Set the sentry DSN to send the error

### User the lib
`const { WCLError } = lib.utils`

### Usage of the WCLError

```javascript

const httpError = new WCLError('errmessage', {
  status: 403,
  code: 1008,
  isSentry: true // With `isSentry` is true and DSN setted throw node_env this error will be sent do sentry.
})

// In the remote method to return the error response
throw httpError.toHttp() // trans to http-error

// Convert common error into WCLError
const err = new Error('system error')

const httpError = new WCLError(err, {
  message: 'invalid password', // Will overwrite the error.message
  userInfo: { // will add extra info
    username: ole3021,
    target: www.github.com
  }
})

const ERRORS = { // Predifined error
  LOGIN_ERROR: {
    status: 401,
    message: 'invalid to login'
  }
}

const templateError = new WCLError(ERRORS.LOGIN_ERROR, {
  details: [{
    messsage: 'missing username'
  }, {
    message: 'missing pasword'
  }]
})
```

