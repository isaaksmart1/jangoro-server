const developmentMode = true;

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
};
