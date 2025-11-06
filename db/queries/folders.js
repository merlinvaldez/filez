import db from "../client.js";

export async function getFolders() {
  const sql = `SELECT folders.*
  FROM folders *
    `;

  const { rows: folders } = await db.query(sql);

  return folders;
}

export async function getFolderById(id) {
  const sql = `
    SELECT folders.*,
    (SELECT json_agg(files) 
     FROM files 
     WHERE files.folder_id=folders.id) as files
  FROM folders
  WHERE id = $1
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}

export async function createFile({ name, size, folder_id }) {
  const sql = `
     INSERT INTO files (name, size, folder_id)
     VALUES ($1,$2, $3)
     RETURNING *
    `;
  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);

  return file;
}
