const express = require("express");
const path = require("path");
require("dotenv").config({ path: "../.env" });

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/test", async (req, res) => {
  res.send("it wordsks");
});

app.post("/sendMessage", async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  console.log({ accountSid });
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
      res.send("message sent");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, (req, res) => console.log("listening on port 3000"));
