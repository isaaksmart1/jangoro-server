const mailchimp = require("@mailchimp/mailchimp_transactional")(
  "md-KUs8pl5qZPz5pZIb93h0Yg"
);
const config = require("../config.json");

const sendEmail = async ({ to, subject, text, from = config.emailFrom }) => {
  const message = {
    from_email: from,
    subject: subject,
    text: text,
    to: [
      {
        email: to,
        type: "to",
      },
    ],
  };
  try {
    const response = await mailchimp.messages.send({message});
    console.log(response);
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;

// ref: https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
