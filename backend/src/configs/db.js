const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const pgp = require("pg-promise")(/* options */);
const db = pgp(process.env.DATABASE_URL);

module.exports = db;
