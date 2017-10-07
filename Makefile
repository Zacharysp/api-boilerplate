DEBUG = DEBUG=lorem,lorem:*
BIN = ./node_modules/.bin
TESTS = server/test/*.test.js
MOCHA_OPTS = -b --timeout 10000 --reporter spec
NODEMON+CONFIG = ./configs/nodemon.json

lint:
	@echo "Linting..."
	@$(BIN)/eslint .
lint-fix:
	@echo "Linting with fix flag..."
	@$(BIN)/eslint --fix .
test: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/_mocha $(MOCHA_OPTS) $(TESTS)
test-cov: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/istanbul cover $(BIN)/_mocha -- $(MOCHA_OPTS) $(TESTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(BIN)/coveralls --verbose
.PHONY: lint lint-fix test test-cov test-coveralls

start:
	@NODE_ENV=production $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
start-dev:
	@NODE_ENV=development $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
start-staging:
	@NODE_ENV=staging $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
.PHONY: start-dev start-staging
