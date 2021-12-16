require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const autheToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, autheToken);

client.messages
  .create({
    body: "Hey, test text message yo!",
    to: "+15169969922",
    from: "+12177491354",
  })
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
