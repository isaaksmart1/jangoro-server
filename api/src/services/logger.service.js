const fs = require("fs");
const {
  cloudwatchlogs,
  logGroupName,
  accountStream,
} = require("../config/database");
const path = require("path");

function Log(message, logStreamName) {
  const params = {
    logGroupName: logGroupName,
    logStreamName: logStreamName,
    logEvents: [
      {
        message:
          typeof message === "string" ? message : JSON.stringify(message),
        timestamp: new Date().getTime(),
      },
    ],
  };

  const logFile = path.join(__dirname, "../../logs/logs.txt");
  fs.writeFile(logFile, JSON.stringify(params), "utf-8", function (err, data) {
    if (err) console.error(err);
    else console.log(data);
  });

  // cloudwatchlogs.putLogEvents(params, function (err, data) {
  //   if (err) console.error(err, err.stack);
  //   else console.log(data);
  // });
}

module.exports = {
  Log,
  accountStream,
};
