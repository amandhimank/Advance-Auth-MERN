const { MailtrapClient } = require("mailtrap");
require('dotenv').config();

const mailtrap_client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Aman Dhiman",
};

module.exports = { mailtrap_client, sender };
