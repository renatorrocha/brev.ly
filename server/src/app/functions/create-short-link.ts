import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const createShortLinkInput = z.object({
	originalUrl: z.url(),
	shortUrl: z.string().regex(/^[a-zA-Z0-9]+$/),
});

type CreateShortLinkInput = z.input<typeof createShortLinkInput>;

export async function createShortLink(input: CreateShortLinkInput) {
	const { originalUrl, shortUrl } = input;

	const existingShortLink = await db.query.short_links.findFirst({
		where: eq(schema.short_links.shortUrl, shortUrl),
	});

	if (existingShortLink) {
		return null;
	}

	const [shortLink] = await db
		.insert(schema.short_links)
		.values({
			originalUrl,
			shortUrl,
		})
		.returning();

	return shortLink;
}
