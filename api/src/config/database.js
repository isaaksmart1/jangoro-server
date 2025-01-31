const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { developmentMode } = require("../middleware/helpers");

// Configure AWS with your credentials and desired region
AWS.config.update({
  region: "eu-west-2",
  accessKeyId: "AKIA6FYDLCFVAJ6V2D37",
  secretAccessKey: "9g+bpaZLFKHt8H5DyQgkb6mjbUqD2PL4COFuC+nk",
});

// Cloud watch logs instance
const cloudwatchlogs = new AWS.CloudWatchLogs();
const logGroupName = "/aws/oe/log";
const accountStream = "accounts";

// Create S3 instance
const s3 = new AWS.S3();

// Create a new DynamoDB instance
const dynamodb = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

// const usersTable = "idfy-db-users-test";
const usersTable = developmentMode ? "oe-db-users-dev" : "oe-db-users-prod";

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
  s3,
  dynamodb,
  documentClient,
  cloudwatchlogs,
  logGroupName,
  accountStream,
  AWS,
  userSchema,
};
