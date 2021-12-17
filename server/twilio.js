const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

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
      body: req.body.textMessageBody,
      to: req.body.toPhoneNumber,
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

const { google } = require("googleapis");
const fs = require("fs");

const outputFile = path.join(__dirname, "../public/newOutput.json");

app.get("/getData", async (req, res) => {
  console.log("hey");
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //create client instance for auth
  const client = await auth.getClient();

  //Instance of google sheets api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1coLgebSaRdBygIVRSR9IVtwfWrIm5uIaHB11_ff43zc";

  // get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,

    spreadsheetId,
  });

  const getWrestlers = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet2!A2:Z",
  });

  //write row(s) to spreadsheet

  //   await googleSheets.spreadsheets.values.append({
  //     auth,
  //     spreadsheetId,
  //     range: "Sheet1!Y:Z",
  //     valueInputOption: "USER_ENTERED",
  //     resource: {
  //       values: [["poop", "shoop", "troop", "hoop"]],
  //     },
  //   });

  res.send(getWrestlers.data.values);

  fs.writeFile(
    outputFile,
    JSON.stringify(getWrestlers.data.values),
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
  console.log("data loaded");
});

app.listen(3000, (req, res) => console.log("listening on port 3000"));
