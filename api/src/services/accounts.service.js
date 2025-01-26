const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const config = require("../config.json");
const sendEmail = require("../middleware/send-email");
const { env, developmentMode } = require("../middleware/helpers");
const { Log, accountStream } = require("./logger.service");
const { cancelSubscriptionsAndDeleteCustomer } = require("./payments.service");

// periodicallyDeleteCodes();

const authenticate = async (email, password) => {
  const params = {
    TableName: db.usersTable,
    IndexName: "email-index", // Your GSI name
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  };

  try {
    const result = await db.dynamodb.query(params).promise();

    if (result.Items) {
      let account = db.AWS.DynamoDB.Converter.unmarshall(result.Items[0]);

      if (account.status === "blocked") {
        Log(
          `${account.email}, ${account.status}, Cannot login.`,
          accountStream
        );
        throw "Your account is blocked, please contact support.";
      }

      if (!bcrypt.compareSync(password, account.password)) {
        Log(
          `${password}, ${account.password}, Incorrect login details.`,
          accountStream
        );
        throw "Incorrect login details.";
      }

      // authentication successful so generate jwt and refresh tokens
      const jwtToken = generateJwtToken(account);
      const refreshToken = generateRefreshToken(account);
      const user = {
        ...account,
        jwtToken,
        refreshToken,
        status: "active",
      };

      // update status to active
      updateUser(user);

      Log(user, accountStream);
      return user;
    } else {
      Log(`${email}, User not found.`, accountStream);
      throw "User not found.";
    }
  } catch (err) {
    Log(err, accountStream);
    throw err;
  }
};

const register = async (data) => {
  // const codes = await getAllCodes();
  // const code = codes[codes.findIndex((code) => code.code.N === data.code)];
  // try {
  //   if (code) deleteCodes(code.code.N);
  // } catch (err) {
  //   Log(`Verification code not found, ${err}`, accountStream);
  //   throw "Verification code not found";
  // }

  const query = {
    TableName: db.usersTable,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: data.email },
    },
  };

  let account = await db.dynamodb.query(query).promise();

  if (account.Items.length > 0) {
    Log(`User with that email already exists, ${data.email}`, accountStream);
    throw "User with that email already exists.";
  }

  let doWhile = true;
  let newId = uuidv4();
  do {
    newId = uuidv4();
    const queryId = {
      TableName: db.usersTable,
      IndexName: "id-index",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": { S: newId },
      },
    };
    account = await db.dynamodb.query(queryId).promise();
    if (account.Items.length > 0)
      Log(`User with that id already exists, ${data.id}`, accountStream);
    else doWhile = false;
  } while (doWhile);

  const schema = db.userSchema(newId, data);

  const params = {
    TableName: db.usersTable,
    Item: schema,
  };

  try {
    if (developmentMode) {
      return createUser(params);
    } else {
      const valid = env("checkEmailDomain", data.email, organisation);
      if (valid) {
        return createUser(params);
      } else {
        Log(`Invalid student email address, ${data.email}`, accountStream);
        throw `Invalid student email address`;
      }
    }
  } catch (err) {
    Log(err, accountStream);
    throw "Error creating user";
  }
};

const resetPassword = async (data) => {
  const query = {
    TableName: db.usersTable,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: data.email },
    },
  };

  const account = await db.dynamodb.query(query).promise();

  if (account.Items.length > 0) {
    let user = db.AWS.DynamoDB.Converter.unmarshall(account.Items[0]);

    if (user.email.toLowerCase() === data.email.toLowerCase()) {
      return user.id;
    } else {
      Log(`User details incorrect`, accountStream);
      Log(user, accountStream);
      Log(data, accountStream);
      throw 500;
    }
  } else {
    Log(`User not found, ${data.email}`, accountStream);
    throw "User not found";
  }
};

const getUser = async (email) => {
  const params = {
    TableName: db.usersTable,
    IndexName: "email-index", // Your GSI name
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  };

  try {
    const result = await db.dynamodb.query(params).promise();

    if (result.Items) {
      let account = null;
      if (result.Items.length > 0)
        account = db.AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
      else {
        Log(`User not found, ${email}`, accountStream);
        throw "User not found.";
      }
      return account;
    } else {
      Log(`User not found, ${email}`, accountStream);
      throw "User not found.";
    }
  } catch (err) {
    Log(err, accountStream);
    throw err;
  }
};

const getUserById = async (id) => {
  const params = {
    TableName: db.usersTable,
    IndexName: "id-index", // Your GSI name
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": { S: id },
    },
  };

  try {
    const result = await db.dynamodb.query(params).promise();

    if (result.Items) {
      let account = null;
      if (result.Items.length > 0)
        account = db.AWS.DynamoDB.Converter.unmarshall(result.Items[0]);
      else {
        Log(`User not found, ${email}`, accountStream);
        throw "User not found.";
      }
      return account;
    } else {
      Log(`User not found, ${email}`, accountStream);
      throw "User not found.";
    }
  } catch (err) {
    Log(err, accountStream);
    throw err;
  }
};

const updateUser = async (newData) => {
  const params = {
    TableName: db.usersTable,
    IndexName: "id-index", // Your GSI name
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": { S: newData.id },
    },
  };

  try {
    const { Items } = await db.dynamodb.query(params).promise();

    if (Items.length === 0) {
      Log("User not found", accountStream);
      throw new Error("User not found");
    }

    // Always include existing attributes in the update expression
    const updateAttributes = {};

    for (const key in newData) {
      if (key !== "jwtToken" && key !== "email" && key !== "id") {
        updateAttributes[key] = newData[key];
      }
    }

    if (Object.keys(updateAttributes).length === 0) {
      return "No new attributes to update";
    }

    // Update the DynamoDB item
    const updateExpression = `SET ${Object.keys(updateAttributes)
      .map((attr, index) => `#attr${index} = :val${index}`)
      .join(", ")}`;

    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(updateAttributes).forEach((attr, index) => {
      expressionAttributeNames[`#attr${index}`] = attr;
      expressionAttributeValues[`:val${index}`] = updateAttributes[attr];
    });

    const updateParams = {
      TableName: db.usersTable,
      Key: {
        email: newData.email,
        id: newData.id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await db.documentClient.update(updateParams).promise();
    return 200;
  } catch (err) {
    Log(err, accountStream);
    throw new Error("Error updating user");
  }
};

const updatePassword = async (newData) => {
  const params = {
    TableName: db.usersTable,
    IndexName: "email-index", // Your GSI name
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: newData.email },
    },
  };

  try {
    const { Items } = await db.dynamodb.query(params).promise();

    if (Items.length === 0) {
      Log("User not found", accountStream);
      throw new Error("User not found");
    }

    const account = db.AWS.DynamoDB.Converter.unmarshall(Items[0]);

    // Create an object with only the new key-value pairs
    const newAttributes = {};
    for (const key in newData) {
      if (key === "password") {
        newAttributes[key] = hash(newData[key]);
      }
    }

    if (Object.keys(newAttributes).length === 0) {
      return "No new attributes to update";
    }

    // Update the DynamoDB item
    const updateExpression = `SET ${Object.keys(newAttributes)
      .map((attr, index) => `#attr${index} = :val${index}`)
      .join(", ")}`;

    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(newAttributes).forEach((attr, index) => {
      expressionAttributeNames[`#attr${index}`] = attr;
      expressionAttributeValues[`:val${index}`] = newAttributes[attr];
    });

    const updateParams = {
      TableName: db.usersTable,
      Key: {
        email: newData.email,
        id: account.id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await db.documentClient.update(updateParams).promise();
    return newAttributes["password"];
  } catch (err) {
    Log(err, accountStream);
    throw new Error("Error updating password");
  }
};

const deactivate = async (account) => {
  try {
    // console.log(account);
    const deleteParams = {
      TableName: db.usersTable,
      Key: {
        email: account.email,
        id: account.id,
      },
    };

    // const result = await sendEmail({
    //   to: "team@huddl.so",
    //   subject: "Huddl Account Deactivation: Anonymous feedback",
    //   text: `Reason for deletion - ${data.feedback}`,
    // });
    // result = await cancelSubscriptionsAndDeleteCustomer(account.email);
    const result = 200;
    if (result === 200) {
      await db.documentClient.delete(deleteParams).promise();
      Log(`Account deleted`, accountStream);
      Log(account, accountStream);
      return result;
    } else {
      throw `Failed to cancel account membership: ${account.email}\n\n${result}`;
    }
  } catch (err) {
    console.log(err);
    Log(err, accountStream);
    throw err;
  }
};

function generateJwtToken(account) {
  // create a jwt token containing the account id that expires in 3 hours
  return jwt.sign({ sub: account.id, id: account.id }, config.secret, {
    expiresIn: "180m",
  });
}

function generateRefreshToken(account) {
  // create a jwt refresh token containing the account id that expires in 7 days
  return jwt.sign({ sub: account.id, id: account.id }, config.refreshSecret, {
    expiresIn: "7d",
  });
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

async function createUser(params) {
  try {
    await db.dynamodb.putItem(params).promise();
    Log("You are now registered.", accountStream);
    return "You are now registered.";
  } catch (error) {
    Log(error, accountStream);
  }
}

module.exports = {
  authenticate,
  register,
  resetPassword,
  getUser,
  getUserById,
  updateUser,
  updatePassword,
  deactivate,
  generateJwtToken,
  generateRefreshToken,
};
