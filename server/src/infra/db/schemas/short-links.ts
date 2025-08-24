import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const short_links = pgTable("short_links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	originalUrl: text("original_url").notNull(),
	shortUrl: text("short_url").notNull().unique(),
	clicks: integer("clicks").notNull().default(0),

	createdAt: timestamp("created_at").defaultNow().notNull(),
});
