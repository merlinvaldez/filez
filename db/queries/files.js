import db from "../client.js";

export async function getFiles() {
  const sql = `SELECT files.*,
    folders.name AS folder_name
    FROM files
    JOIN folders ON folders.id=files.folder_id`;

  const { rows: files } = await db.query(sql);

  return files;
}
