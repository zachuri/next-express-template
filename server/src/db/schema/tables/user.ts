import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const REFERRAL_CODE_LENGTH = 7;
export const ALL_ROLES = ["guest", "specialist", "admin"] as const;
export const roleEnum = pgEnum("role", ALL_ROLES);

export const users = pgTable(
	"user",
	{
		// nextauth fields
		id: text("id").notNull().primaryKey(),
		name: text("name"),
		email: text("email").notNull(),
		emailVerified: timestamp("emailVerified", { mode: "date" }),
		image: text("image"),

		// custom fields
		password: varchar("password", { length: 510 }),
		username: varchar("username", { length: 60 }),
		role: roleEnum("role").notNull().default("guest"),
		phoneNumber: varchar("phone_number", { length: 20 }),
	},
	t => ({
		phoneNumberIdx: index("phone_number_idx").on(t.phoneNumber),
		emailIdx: index("email_idx").on(t.email),
	})
);
