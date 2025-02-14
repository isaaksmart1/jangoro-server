const developmentMode = true;

const URL = {
  app: "https://app.jangaro.com",
  www: "https://jangaro.com",
  api: "https://api.jangaro.com",
  ai: "https://ai.jangaro.com",
  base_l: "http://localhost:5173",
  www_l: "http://localhost:3000",
  api_l: "http://localhost:4000",
  ai_l: "http://localhost:5000",
};

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
  developmentMode,
  checkEmailDomain,
  env,
  URL,
};
