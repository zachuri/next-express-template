import { pgTable, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const todo = pgTable("todo", {
	id: varchar("id", { length: 21 }).primaryKey().$defaultFn(nanoid),
	text: varchar("text"),
});
