#!/usr/bin/env bash
# create_influx_user.sh

USERNAME=$1
PASSWORD=$2
USER_BUCKET=$3
RETENTION=$4  # e.g. '30d'
ORG_NAME="MainOrg"

# 1) Create the user
influx user create \
  --name $USERNAME \
  --password $PASSWORD

# 2) Create the bucket
influx bucket create \
  --org $ORG_NAME \
  --name $USER_BUCKET \
  --retention $RETENTION

# 3) Grant the user a token restricted to that bucket
NEW_TOKEN=$(influx auth create \
  --user $USERNAME \
  --write-bucket $USER_BUCKET \
  --read-bucket $USER_BUCKET \
  --description "Token for $USERNAME on bucket $USER_BUCKET" \
  --json | jq -r '.token')

echo "New token: $NEW_TOKEN"
