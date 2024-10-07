const db = require("../configs/db");

const Auth = {};

// Login
Auth.getUserName = (username) => {
  return db.oneOrNone(`SELECT * FROM auth WHERE username LIKE '${username}'`);
};
Auth.getUser = (refreshToken) => {
  return db.oneOrNone(
    `SELECT * FROM auth WHERE refresh_token LIKE '${refreshToken}'`
  );
};
// Save refresh token
Auth.saveRefreshToken = (token, username, password) => {
  db.none(
    `
    UPDATE auth 
    SET refresh_token = '${token}'
    WHERE username LIKE '${username}' AND password_hash LIKE '${password}'
    `
  );
};
// Get refresh token
Auth.getRefreshToken = (token) => {
  return db.oneOrNone(
    `SELECT refresh_token FROM auth WHERE refresh_token LIKE '${token}'`
  );
};
// Update refresh token
Auth.updateRefreshToken = (newToken, oldToken) => {
  return db.none(
    `UPDATE auth SET refresh_token = '${newToken}' WHERE refresh_token LIKE '${oldToken}'`
  );
};
// Change password
Auth.changePassword = (username, oldPassword, newPassword) => {
  return db.none(`
  UPDATE auth 
  SET password_hash = '${newPassword}'
  WHERE username LIKE '${username}' AND password_hash = '${oldPassword}'
  `);
};
// Create Auth table
function createTable() {
  db.query(`CREATE TABLE IF NOT EXISTS auth (
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        username TEXT NOT NULL, 
        password_hash TEXT NOT NULL
        refresh_token TEXT UNIQUE DEFAULT NULL
    )`);
}

function addColumn() {
  db.query(
    `ALTER TABLE auth ADD COLUMN refresh_token TEXT UNIQUE DEFAULT NULL`
  );
}

module.exports = { Auth };
