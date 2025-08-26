import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const createShortLinkInput = z.object({
	originalLink: z.url(),
	shortLink: z.string().regex(/^[a-zA-Z0-9]+$/),
});

type CreateShortLinkInput = z.input<typeof createShortLinkInput>;

export async function createShortLink(input: CreateShortLinkInput) {
	const { originalLink, shortLink } = input;

	const existingShortLink = await db.query.short_links.findFirst({
		where: eq(schema.short_links.shortLink, shortLink),
	});

	if (existingShortLink) {
		return null;
	}

	const [shortLinkData] = await db
		.insert(schema.short_links)
		.values({
			originalLink,
			shortLink,
		})
		.returning();

	return shortLinkData;
}
