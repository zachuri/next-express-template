import { type Config } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	console.error("DATABASE_URL environment variable is not defined.");
	process.exit(1); // Exit the application with an error code
}

export default {
	schema: "./src/db/schema/*", //separate the schemas
	driver: "pg",
	verbose: true,
	dbCredentials: {
		connectionString: databaseUrl,
	},
	out: "./src/server/drizzle",
	// tablesFilter: ["t3-drzl_*"],
} satisfies Config;
