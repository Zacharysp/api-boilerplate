#!/bin/bash
set -ev

# Environment variables.
NODE_ENV=${NODE_ENV:-development}
COUCHBASE_USER=${COUCHBASE_USER:-Administrator}
COUCHBASE_PASS=${COUCHBASE_PASS:-password}
BUCKET_LOREM=${BUCKET_LOREM:-lorem}
CWD=$(dirname "$0")

cd ${CWD}/${NODE_ENV}
docker-compose up -d "${@}"

while true; do
  if docker-compose run --rm \
    --entrypoint=/opt/couchbase/bin/couchbase-cli couchbase \
    server-info -c couchbase:8091 \
    -u $COUCHBASE_USER -p $COUCHBASE_PASS 2> /dev/null; then
    break
  fi
  sleep 3
done

docker-compose run --rm \
    --entrypoint=/opt/couchbase/bin/couchbase-cli couchbase \
    cluster-init -c couchbase:8091 -u $COUCHBASE_USER -p $COUCHBASE_PASS \
    --cluster-username=$COUCHBASE_USER --cluster-password=$COUCHBASE_PASS \
    --cluster-ramsize=512 --cluster-index-ramsize=256 \
    --cluster-fts-ramsize=256 \
    --services=data,index,query,fts

docker-compose run --rm \
  --entrypoint=/opt/couchbase/bin/couchbase-cli couchbase \
  bucket-create -c couchbase:8091 -u $COUCHBASE_USER -p $COUCHBASE_PASS \
  --bucket=${BUCKET_LOREM} --bucket-type=couchbase --bucket-port=11211 \
  --bucket-ramsize=128 --bucket-replica=0 --enable-flush=1 --wait
