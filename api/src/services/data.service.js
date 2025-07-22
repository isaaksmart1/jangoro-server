const { aiQueriesTable, documentClient } = require("../config/database");

const postAIQueries = async (id, email) => {
  if (!id || !email) {
    throw { error: "Missing user information" };
  }

  const now = new Date();
  const currentMonth = `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}`;

  const getParams = {
    TableName: aiQueriesTable,
    Key: { id },
  };

  try {
    const { Item } = await documentClient.get(getParams).promise();

    const lastResetMonth = Item?.lastReset || currentMonth;
    const isNewMonth = currentMonth !== lastResetMonth;

    let usage;
    let updateParams;

    if (!Item) {
      usage = 999;
      updateParams = {
        TableName: aiQueriesTable,
        Key: { id },
        UpdateExpression:
          "SET email = :email, #usage = :usage, lastReset = :lastReset",
        ExpressionAttributeNames: {
          "#usage": "usage",
        },
        ExpressionAttributeValues: {
          ":email": email,
          ":usage": usage,
          ":lastReset": currentMonth,
        },
        ReturnValues: "UPDATED_NEW",
      };
    } else if (isNewMonth) {
      usage = 999;
      updateParams = {
        TableName: aiQueriesTable,
        Key: { id },
        UpdateExpression: "SET #usage = :usage, lastReset = :lastReset",
        ExpressionAttributeNames: {
          "#usage": "usage",
        },
        ExpressionAttributeValues: {
          ":usage": usage,
          ":lastReset": currentMonth,
        },
        ReturnValues: "UPDATED_NEW",
      };
    } else {
      usage = Math.max(0, Item.usage - 1);
      updateParams = {
        TableName: aiQueriesTable,
        Key: { id },
        UpdateExpression: "SET #usage = :usage",
        ExpressionAttributeNames: {
          "#usage": "usage",
        },
        ExpressionAttributeValues: {
          ":usage": usage,
        },
        ReturnValues: "UPDATED_NEW",
      };
    }

    const result = await documentClient.update(updateParams).promise();

    return {
      message: !Item
        ? "Created new item with usage = 999"
        : isNewMonth
        ? "New month: usage reset to 999"
        : "Decremented usage",
      result,
    };
  } catch (error) {
    console.error("DynamoDB operation failed:", error);
    throw { error: "Failed to process item" };
  }
};

const getAIQueries = async (id) => {
  if (!id) {
    throw { error: "Missing user ID" };
  }

  const getParams = {
    TableName: aiQueriesTable,
    Key: { id },
  };

  try {
    const existing = await documentClient.get(getParams).promise();
    return existing?.Item;
  } catch (error) {
    console.error("DynamoDB operation failed:", error);
    throw { error: "Failed to retrieve item" };
  }
};

module.exports = {
  postAIQueries,
  getAIQueries,
};
