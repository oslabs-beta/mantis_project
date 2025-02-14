
USERNAME=$1
PASSWORD=$2
USER_BUCKET=$3
RETENTION=$4  # e.g., '30d'
ORG_NAME="MainOrg"

INFLUX_HOST="http://localhost:8086"
ADMIN_TOKEN="supersecret"

# 1️⃣ Create the user
influx user create \
  --host $INFLUX_HOST \
  --token $ADMIN_TOKEN \
  --name $USERNAME \
  --password $PASSWORD

# 2️⃣ Create the bucket
influx bucket create \
  --host $INFLUX_HOST \
  --token $ADMIN_TOKEN \
  --org $ORG_NAME \
  --name $USER_BUCKET \
  --retention $RETENTION

# 3️⃣ Grant the user a token restricted to that bucket
NEW_TOKEN=$(influx auth create \
  --host $INFLUX_HOST \
  --token $ADMIN_TOKEN \
  --user $USERNAME \
  --write-bucket $USER_BUCKET \
  --read-bucket $USER_BUCKET \
  --description "Token for $USERNAME on bucket $USER_BUCKET" \
  --json | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "New token for $USERNAME: $NEW_TOKEN"