const { redemptionTable, documentClient } = require("../config/database");
const codes = require("./codes.json");

async function batchInsertRedemptionCodes(redemptionCodes) {
  const BATCH_SIZE = 15; // DynamoDB batch write limit
  let batches = [];
  let count = 0;

  const codes = redemptionCodes.redemption_codes;

  for (let i = 0; i < codes.length; i += BATCH_SIZE) {
    batches.push(codes.slice(i, i + BATCH_SIZE));
  }

  for (let batch of batches) {
    const putRequests = batch.map((code) => ({
      PutRequest: {
        Item: {
          code,
          createdAt: new Date().toISOString(),
          userId: "0",
          ipAddress: "0",
          redeemed: false,
        },
      },
    }));

    const params = {
      RequestItems: {
        [redemptionTable]: putRequests,
      },
    };

    try {
      count++;
      await documentClient.batchWrite(params).promise();
      console.log(`Inserted batch of ${putRequests.length} codes`);
      console.log(count);
    } catch (error) {
      console.error("Error inserting batch:", error);
    }
  }
}

async function deleteAllEntries() {
  try {
    let scanParams = { TableName: redemptionTable };
    let count = 0;
    let items;
    do {
      items = await documentClient.scan(scanParams).promise();

      if (!items.Items || items.Items.length === 0) {
        console.log("No items to delete.");
        return;
      }

      // Split items into chunks of 25 (DynamoDB batchWrite limit)
      const batches = chunkArray(items.Items, 15);

      for (const batch of batches) {
        const deleteRequests = batch.map((item) => ({
          DeleteRequest: {
            Key: { code: item.code }, // Ensure this matches your table's primary key
          },
        }));

        const batchWriteParams = {
          RequestItems: { [redemptionTable]: deleteRequests },
        };

        await documentClient.batchWrite(batchWriteParams).promise();
        console.log(`Deleted ${deleteRequests.length} items in batch.`);
        count++;
        console.log(count);
      }

      scanParams.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (items.LastEvaluatedKey);

    console.log("All items deleted successfully.");
  } catch (error) {
    console.error("Error deleting items:", error);
  }
}

// Utility function to split array into chunks of a given size
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

// deleteAllEntries();
batchInsertRedemptionCodes(codes);
