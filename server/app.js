const express = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const outputFile = path.join(__dirname, "../public/newOutput.json");

const app = express();

app.get("/", async (req, res) => {
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
});

app.listen(3000, (req, res) => console.log("listening on port 3000"));
