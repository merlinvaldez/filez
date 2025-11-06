import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const folderNane = `Folder ${i}`;
    const {
      rows: [folder],
    } = await db.query(
      `
      INSERT INTO folders(name) 
      VALUES ($1) 
      RETURNING id`,
      [folderNane]
    );
    for (let j = 0; j < 5; j++) {
      const fileName = `Person ${i} -File ${j}`;
      const fileSize = faker.number.int({ max: 100 });

      await db.query(
        `
      INSERT INTO files(name,size,folder_id)
      VALUES($1,$2,$3)`,
        [fileName, fileSize, folder.id]
      );
    }
  }
}
