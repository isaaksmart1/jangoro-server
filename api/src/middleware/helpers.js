const DEVELOPMENT = false;
const USE_DEV_DB = true;

const dev = {
  app: "http://localhost:3000",
  www: "http://localhost:6001",
  api: "http://localhost:4000",
  ai: "http://localhost:5000",
};

const prod = {
  app: "https://app.jangoro.com",
  www: "https://jangoro.com",
  api: "http://api.jangoro.com",
  ai: "http://ai.jangoro.com",
};

const URL = DEVELOPMENT ? dev : prod;

function env() {
  const command = arguments[0];
  if (typeof command !== "string") {
    return;
  }

  switch (command) {
    case "checkEmailDomain":
      return checkEmailDomain(arguments[1], arguments[2]);
    default:
      break;
  }
}

function checkEmailDomain(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

module.exports = {
  DEVELOPMENT,
  USE_DEV_DB,
  checkEmailDomain,
  env,
  URL,
};
