import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// TODO ENV

dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

const EMAIL = process.env.USER_EMAIL!;
const USERNAME = process.env.USERNAME!;
const PASSWORD = process.env.USER_PASSWORD!;

const main = async () => {
  try {
    console.log("Seeding database");

    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    await db.insert(schema.users).values({
      name: USERNAME,
      email: EMAIL,
      password: hashedPassword,
    });

    console.log("Seeding finished");
  } catch (error) {
    console.log(error);

    throw new Error("Seeding failed");
  }
};

main();
