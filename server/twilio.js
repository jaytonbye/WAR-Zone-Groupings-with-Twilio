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
  const auth = new google.auth.GoogleAuth({
    keyFile: {
      type: "service_account",
      project_id: "sound-observer-335221",
      private_key_id: "16c272d293a67f7b947dc754d0db882bd78f7f64",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5PjI4w02KREUl\nTDdv40G2Ug+V/dLmBJpBvPa8PrZKClFpyQVB+VNY8t08YcYSe3EaHYMq4XOvorjI\nGCk4mFTNhVyafsohgKmj4hr4O67kCX3olGon66J+kVvJ8SMT7X3lRR6wFzkLbc+n\ng75Sdtr6UZzNM1ZXJ7YBkzE7ta5MbucQa10S3A7Hn/DRlt7oPf0LK3NsQv9OtsiV\nhmCOAyYvKExcxVX5cDzWEKUFEwRfcHJSHoD/dOrZNURoOdUO2kfbtRY3WNqS1nGf\nEz6va0/U2J1Dhx3qoRWJp3TNbYIFMnxXbgeoqvA6vptwBIwdwc346lXvcioDN5VE\n4es9qXDTAgMBAAECggEAArpllofv3oT938SBNwWDk9UeTCC8idVsQs4SCMH7W7Vv\ne5t/E09rTMVlNDrJwQlxsGELshT9gLyaKgifo7E8kPDPXOw3Mv376uND83sSkgfb\noGjx2zjxalOMQaEojzzxf3gksVCYkCLuDbtN7BuI8HrZ1JmxSpagJaB36wG7slSs\nl+QD4tf/nnwfZZ5R95c8qWV1WxlD5lDXY3Wb69/8+3FJVUtD6vRoF87X5q6jG+xQ\nAxP3URxdo9CJcDxkRjbqWgSLnVVR4yqKBJMoe91blHU4EMu6Ad/ICplhlNnl+DNa\nyw8Mva/pXN7KE22oa0giIeGn9pnsgN5lwI8X9GMaJQKBgQD+4tnahtFYKfVCtwn+\ntiAqV4bkyGyvD7hV8Xrn5+PUPg5cS0Urd422njycJKUiWZVFZdKYFRW2qU0DNNMC\n41sBjcHti7JRSHx6mWmh/krqJXTA1ZfaqtZgHyMF8vQVs10JT0YTmCt0AjVdTvzf\nrDUXRbRBkVrxiGbZ7R3qmZJgNQKBgQC6DW7mdFaNAhawMQz1N0BnVM5dB6qeTWtr\nJbHSt8wgCS8E9Tj72UVqL/KshDCKVWAFOf2pwHV7Oyz5PameilvPPnX5nV3WV0pd\nlkOCsVTFOBQc4u7ok2stdWZS1t1hEWTPqA7i1Gcls1JOVyyvQMrNPb8PQ5nu1Dwc\nocTZqAg95wKBgFNgZZ8kRsquPvpp4a0eansvUoL4RQUnAUerzGab5l0BR7VNMf08\nCHFaZb02B4arAzdGTZNOImI0E2sfFn91W8mwU2WfMt9/9KguEu3YvyzEv+JsfFYd\nWC7tQImrpciLeb2X3vZ96ojyR/6T3ghUzrEkLgjcwYEM+4gCFq0tO0KZAoGBAJBZ\nYcS9WHV4vF+g/tu2LWq+WonFK/Q8Pu5XxZqmbWIhnfBrzfVggkG7x71fpkV9rc0A\nTDWLE9szc1ZBKDvQPyEQ5flvxeFJwnHP5rscmJeXRcuPqiqaTdpsLqJxADuSgjO2\nwS3t+8U9VstfSVUDoRUSJg1Stricw7K3NAJnI1XbAoGALR/U7IbmI532ykefJ7tC\neCqaJ0ghpemn+AlEcDXBJjpOHR6F3BasQ5he7lLTjJYL7zgndgtqgn6vwB+QJ9mP\nruhrbiuUm9HCLXitdQdxrZ6bL8Z74lbUm9vAMTexyB6ry4dMpxb76JJEozAmj65v\no+ArcQ92Tr3drzMZEVoOZpA=\n-----END PRIVATE KEY-----\n",
      client_email:
        "forgooglesheets@sound-observer-335221.iam.gserviceaccount.com",
      client_id: "102752869979930954973",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/forgooglesheets%40sound-observer-335221.iam.gserviceaccount.com",
    },
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
