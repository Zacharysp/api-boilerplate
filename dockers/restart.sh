#!/bin/bash
set -ev

# Require some environment variables. Examples:
NODE_ENV=${NODE_ENV:-development}

pushd `dirname $0`
DIR=`pwd`
popd

pushd ${DIR}/${NODE_ENV}
docker-compose restart
popd
