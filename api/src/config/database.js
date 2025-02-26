const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { DEVELOPMENT, USE_DEV_DB } = require("../middleware/helpers");

// Configurations
const ddbOptions = {
  endpoint: "http://localhost:5768",
  region: "eu-west-2",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
};

const s3Options = {};

// Cloud watch logs instance
const cloudwatchlogs = new AWS.CloudWatchLogs();
const logGroupName = "/aws/jgo/log";
const accountStream = "accounts";

// Create S3 instance
const s3 = new AWS.S3(s3Options);

// Create a new DynamoDB instance
const dynamodb = new AWS.DynamoDB(ddbOptions);
const documentClient = new AWS.DynamoDB.DocumentClient(ddbOptions);

// const usersTable = "idfy-db-users-test";
const usersTable = (DEVELOPMENT || USE_DEV_DB) ? "jgo-db-users-dev" : "jgo-db-users-prod";
const redemptionTable = (DEVELOPMENT || USE_DEV_DB)
  ? "jgo-db-redemptions-dev"
  : "jgo-db-redemptions-prod";

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

const userSchema = (id, data) => {
  const schema = {
    id: { S: id },
    avatarUrl: { S: data.avatarUrl || "" },
    status: { S: data.status || "" },
    username: { S: data.username || "" },
    email: { S: data.email || "" },
    fullName: { S: data.firstName || "" },
    password: { S: hash(data.password) || "" },
    street: { S: data.street || "" },
    city: { S: data.city || "" },
    zip: { S: data.zip || "" },
    subscription: { S: data.subscription || "" },
    dateJoined: { S: data.dateJoined || "" },
    dt: { S: data.dt || "" },
    acceptTerms: { S: data.acceptTerms || "" },
  };
  return schema;
};

module.exports = {
  usersTable,
  redemptionTable,
  s3,
  dynamodb,
  documentClient,
  cloudwatchlogs,
  logGroupName,
  accountStream,
  AWS,
  userSchema,
};
