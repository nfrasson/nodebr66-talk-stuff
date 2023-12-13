import { randomUUID } from "node:crypto";
import { User } from "./database/models/User.mjs";
import { connectToDatabase } from "./database/connection.mjs";

// Top-level await --> Execution on Cold Start
await connectToDatabase(process.env.MONGO_URI);

export async function handler(event, _context, callback) {
  const { secret } = await getParameters("nodebr/secret");
  const { name, email, password } = JSON.parse(event.body);

  const user = await User.create({
    id: randomUUID(),
    name,
    email,
    password,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
}
