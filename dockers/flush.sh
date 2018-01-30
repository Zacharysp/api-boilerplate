#!/bin/bash
set -ev

CONTAINER_NAME=${CONTAINER_NAME:-boilerplate_couchbase}

docker container rm $CONTAINER_NAME
