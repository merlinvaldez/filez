import db from "../client.js";

export async function getFolders() {
  const sql = `SELECT folders.*
  FROM folders *
    `;

  const { rows: folders } = await db.query(sql);

  return folders;
}
