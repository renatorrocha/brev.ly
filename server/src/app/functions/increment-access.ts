import { eq, sql } from "drizzle-orm";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export async function incrementAccess(id: string) {

    
	await db
		.update(schema.short_links)
		.set({
			clicks: sql`${schema.short_links.clicks} + 1`,
		})
		.where(eq(schema.short_links.id, id));
}
