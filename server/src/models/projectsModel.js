const db = require("../configs/db");

const blogTable = "projects";
const Projects = {};
// Get all blogs
Projects.getAll = () => {
  // createProjectTable();
  const queryPromise = db.any(
    `SELECT * FROM ${blogTable} ORDER BY created_at DESC`
  );
  return queryPromise;
};
// Get single blog by condition
Projects.getById = (id) => {
  const queryPromise = db.one(`SELECT * FROM ${blogTable} WHERE id = $1`, [id]);
  return queryPromise;
};
// Create blogs
Projects.create = (payload) => {
  const { title, content, position, category, author, thumbnail_url } = payload;
  const queryPromise = db.one(
    `INSERT INTO ${blogTable}(title, content, position, category, author, thumbnail_url) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, content, position, category, author, thumbnail_url]
  );
  return queryPromise;
};
// Update blog
Projects.updateById = (id, payload) => {
  const columns = Object.keys(payload);
  const values = Object.values(payload);
  const updatePayload = [];
  columns.forEach((col, index) => {
    if (typeof values[index] === "string") {
      updatePayload.push(`${col} = '${values[index].replace(/'/g, "''")}'`);
      return;
    }
    updatePayload.push(`${col} = '${values[index]}'`);
  });
  const queryPromise = db.one(
    `UPDATE ${blogTable} SET ${updatePayload.join(
      ","
    )}, updated_at = DEFAULT WHERE id = $1 RETURNING *`,
    [id]
  );
  return queryPromise;
};
// Delete blog
Projects.deleteById = (id) => {
  const queryPromise = db.one(
    `DELETE FROM ${blogTable} WHERE id = $1 RETURNING *`,
    [id]
  );
  return queryPromise;
};

// Create blog table
function createProjectTable() {
  db.none(`CREATE TABLE IF NOT EXISTS projects (
        id SERIAL NOT NULL UNIQUE PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW() CONSTRAINT new_update_date CHECK (created_at < updated_at OR created_at = updated_at),
        title TEXT NOT NULL,
        content TEXT NOT NULL, 
        position TEXT NOT NULL DEFAULT 'default',
        category TEXT NOT NULL DEFAULT 'others',
        author TEXT NOT NULL DEFAULT 'anonymous',
        thumbnail_url TEXT,
        hidden BOOLEAN NOT NULL DEFAULT false
    ) `);
}

module.exports = Projects;
