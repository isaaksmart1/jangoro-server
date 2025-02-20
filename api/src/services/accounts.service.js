const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");
const config = require("../config.json");
const sendEmail = require("../middleware/send-email");
const { env, developmentMode } = require("../middleware/helpers");
const { Log, accountStream } = require("./logger.service");
const { cancelSubscriptionsAndDeleteCustomer } = require("./payments.service");

// Email transport configuration
const transporter = nodemailer.createTransport(config.smtpOptions);
const APP_URL = "https://app.jangoro.com";
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
      return { user, account };
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

  const newData = {
    ...data,
    id: newId,
  };

  try {
    if (developmentMode) {
      return createUser(newData, params);
    } else {
      const valid = env("checkEmailDomain", data.email, organisation);
      if (valid) {
        return createUser(newData, params);
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

const forgotPassword = async (email) => {
  try {
    const user = await getUser(email);
    if (!user) throw "User not found";

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, 10);

    // Save hashed token & expiry time in the database
    user.resetPasswordToken = hash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await updateUser(user);

    // Send email with reset link
    const resetUrl = `${APP_URL}/reset-password/${resetToken}?email=${encodeURIComponent(
      email
    )}`;
    const mailOptions = {
      to: email,
      subject: "Password Reset",
      text: `Click here to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    return { message: "Password reset email sent!" };
  } catch (error) {
    Log({ message: "Server error", error }, accountStream);
    throw { message: "Server error", error };
  }
};

const resetPassword = async (token, email, password) => {
  try {
    const user = await getUser(email);

    if (!user) throw "Invalid or expired token";

    const isValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isValid) throw "Invalid token";

    // Hash the new password & update user
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await updatePassword({ email, password });

    return { message: "Password reset successfully!" };
  } catch (error) {
    Log({ message: "Server error", error }, accountStream);
    throw { message: "Server error", error };
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

const getUsers = async (email) => {
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
      let accounts = null;
      if (result.Items.length > 0) {
        accounts = result.Items.map((item) =>
          db.AWS.DynamoDB.Converter.unmarshall(item)
        );
      } else {
        Log(`Users not found, ${email}`, accountStream);
        throw "Users not found.";
      }
      return accounts;
    } else {
      Log(`Users not found, ${email}`, accountStream);
      throw "Users not found.";
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

    let result = await db.documentClient.delete(deleteParams).promise();
    result = await cancelSubscriptionsAndDeleteCustomer(account.email);

    Log(`Account deleted`, accountStream);
    Log(account, accountStream);

    return result;
  } catch (err) {
    console.log(err);
    Log(`Failed to cancel account membership: ${err}`, accountStream);
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

async function createUser(data, params) {
  try {
    await db.dynamodb.putItem(params).promise();

    // Delete duplicates
    accounts = await getUsers(params.Item.email.S);
    if (accounts.length > 1) {
      const latestObject = accounts.reduce((latest, current) => {
        return new Date(current.dt) > new Date(latest.dt) ? current : latest;
      }, accounts[0]);
      const relics = accounts.filter((obj) => obj !== latestObject);
      relics.forEach((account) => deactivate(account));
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(data);
    Log("You are now registered.", accountStream);

    return {
      user: data,
      accessToken: jwtToken,
    };
  } catch (error) {
    Log(error, accountStream);
  }
}

module.exports = {
  authenticate,
  register,
  resetPassword,
  forgotPassword,
  getUser,
  getUserById,
  updateUser,
  updatePassword,
  deactivate,
  generateJwtToken,
  generateRefreshToken,
};
