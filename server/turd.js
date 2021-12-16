require("dotenv").config({ path: "../.env" });

const blah = process.env.FAKE_THING;

console.log({ blah });
