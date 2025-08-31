import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const incrementAccessInput = z.object({
	id: z.string(),
});

type IncrementAccessInput = z.input<typeof incrementAccessInput>;

export async function incrementAccess(input: IncrementAccessInput) {
	const { id } = input;

	const shortLinkData = await db.query.short_links.findFirst({
		where: eq(schema.short_links.id, id),
	});

	if (!shortLinkData) {
		return null;
	}

	await db
		.update(schema.short_links)
		.set({
			clicks: sql`${schema.short_links.clicks} + 1`,
		})
		.where(eq(schema.short_links.id, shortLinkData.id));

	return true;
}
