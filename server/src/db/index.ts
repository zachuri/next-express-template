import * as schema from "@/db/schema/index";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const database = process.env.DATABASE_URL;

if (!database) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}

const client = postgres(database, { max: 1 });
export const db = drizzle(client, { schema });
