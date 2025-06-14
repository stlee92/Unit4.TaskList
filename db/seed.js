import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("user1", "password!");
  for (let i = 1; i <= 3; i++) {
    await createTask(`Task ${i}`, false, user.id);
  }
}
