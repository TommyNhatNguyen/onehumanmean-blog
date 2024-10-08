const db = require("../configs/db");

const Notification = {};

// Get all notification
Notification.getAllNotifications = () => {
  return db.any(`SELECT * FROM notify ORDER BY created_at DESC`);
};
// Get single notification by id
Notification.getNotificationById = (id) => {
  return db.oneOrNone(`SELECT * FROM notify WHERE id = '${id}'`);
};
// Create new notification
Notification.createNotification = (payload) => {
  const { email, question } = payload;
  return db.oneOrNone(
    `INSERT INTO notify(email, question) VALUES ($1, $2) RETURNING *`,
    [email, question]
  );
};
// Update noti
Notification.updateById = (id, payload) => {
  const columns = Object.keys(payload);
  const values = Object.values(payload);
  const updatePayload = [];
  columns.forEach((col, index) => {
    updatePayload.push(`${col} = '${values[index]}'`);
  });
  const queryPromise = db.one(
    `UPDATE notify SET ${updatePayload.join(
      ","
    )}, is_answer = true, answered_at = NOW() WHERE id = $1 RETURNING *`,
    [id]
  );
  return queryPromise;
};
// Delete by id
Notification.deleteById = (id) => {
  return db.none(`DELETE FROM notify WHERE id = '${id}'`);
};
// Create Notification table
function createTable() {
  db.query(`CREATE TABLE IF NOT EXISTS notify (
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        email TEXT NOT NULL,
        question TEXT
        is_answer BOOLEAN DEFAULT false
        answer TEXT DEFAULT NULL
        answered_at TIMESTAMP DEFAULT NULL
    )`);
}

module.exports = Notification;
