import { relations } from "drizzle-orm";
import { users } from "./tables/user";

export const usersRelations = relations(users, ({ one, many }) => ({
	// accounts: many(accounts),
	// sessions: many(sessions),
	// referralCode: one(referralCodes), // the one they own, not the one used at signup
	// propertiesOwned: many(properties),
	// referralEarnings: many(referralEarnings),
	// messages: many(messages),
	// conversations: many(conversationParticipants),
	// hostProfile: one(hostProfiles),
	// groups: many(groupMembers),
}));
