DEBUG = DEBUG=lorem,lorem:*
BIN = ./node_modules/.bin
TEST_OPTS = --forceExit
NODEMON_CONFIG = ./configs/nodemon.json

lint: lint-js lint-json
lint-js:
	@echo "Linting JavaScript..."
	@$(BIN)/eslint .
lint-json:
	@echo "Linting JSON..."
	@$(BIN)/jsonlint -q package.json ./**/*.json
lint-fix:
	@echo "Linting with fix flag..."
	@$(BIN)/eslint --fix .
watch:
	@echo "Watching changes and testing..."
	NODE_ENV=test $(BIN)/jest --watchAll
test: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/jest $(TEST_OPTS) 
test-cov: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/jest --coverage $(TEST_OPTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(BIN)/coveralls --verbose
.PHONY: lint lint-fix watch test test-cov test-coveralls

start:
	@NODE_ENV=production $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
start-dev:
	@NODE_ENV=development $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
start-staging:
	@NODE_ENV=staging $(DEBUG) $(BIN)/nodemon --config ${NODEMON_CONFIG} .
.PHONY: start start-dev start-staging
