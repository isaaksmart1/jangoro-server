const {
  cloudwatchlogs,
  logGroupName,
  accountStream,
  ideaStream,
  llmStream,
} = require("../config/database");

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

  cloudwatchlogs.putLogEvents(params, function (err, data) {
    if (err) console.error(err, err.stack);
    else console.log(data);
  });
}

module.exports = {
  Log,
  accountStream,
  ideaStream,
  llmStream,
};
