const { aiQueriesTable, documentClient } = require("../config/database");
const fs = require("fs");
const path = require("path");

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

const getEncodedData = async (customerName, customerEmail, surveyTitle) => {
  if (!customerName || !customerEmail || !surveyTitle) {
    throw { error: "Missing required fields" };
  }

  try {
    const fills = fs.readFileSync(
      path.join(__dirname, "../csv/survey-fill.csv"),
      "utf8"
    );
    const rows = fills.split("\n");
    const matchingRow = rows.find((row) => {
      const [name, email, title] = row.split(",");
      return (
        name === customerName &&
        email === customerEmail &&
        title === surveyTitle
      );
    });
    if (matchingRow) {
      const [, , , encodedData] = matchingRow.split(",");
      return { encodedData };
    } else {
      throw { error: "Survey data not found" };
    }
  } catch (error) {
    console.error("Error reading survey data:", error);
    throw { error: "Failed to retrieve survey data" };
  }
};

const saveEncodedData = async (
  customerName,
  customerEmail,
  surveyTitle,
  encodedData
) => {
  if (!customerName || !customerEmail || !surveyTitle || !encodedData) {
    throw { error: "Missing required fields" };
  }

  const filePath = path.join(__dirname, "../csv/survey-fill.csv");

  // Read CSV
  let fileContent = fs.readFileSync(filePath, "utf8").trim();

  // Split into rows
  let rows = fileContent.split("\n");

  // First row = header
  const headers = rows[0].split(",");

  // Find existing row (matching name + email + title)
  const existingIndex = rows.findIndex((row, index) => {
    if (index === 0) return false; // skip header
    const cols = row.split(",");
    return (
      cols[0] === customerName &&
      cols[1] === customerEmail &&
      cols[2] === surveyTitle
    );
  });

  // New row data
  const newRow = `${customerName},${customerEmail},${surveyTitle},${encodedData}`;

  // Overwrite if exists, otherwise append
  if (existingIndex !== -1) {
    rows[existingIndex] = newRow;
  } else {
    rows.push(newRow);
  }

  // Write back to CSV
  try {
    fs.writeFileSync(filePath, rows.join("\n"));
  } catch (error) {
    console.error("Error writing survey data:", error);
    throw { error: "Failed to save survey data" };
  }

  return { message: "Survey fill data saved successfully" };
};

module.exports = {
  postAIQueries,
  getAIQueries,
  saveEncodedData,
  getEncodedData,
};
