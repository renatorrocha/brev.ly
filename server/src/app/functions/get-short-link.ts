import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

const getShortLinkInput = z.object({
	shortUrl: z.string(),
});

type GetShortLinkInput = z.input<typeof getShortLinkInput>;

export async function getShortLink(input: GetShortLinkInput) {
	const { shortUrl } = input;

	const shortLink = await db.query.short_links.findFirst({
		where: eq(schema.short_links.shortUrl, shortUrl),
	});

	if (!shortLink) {
		return null;
	}

	return shortLink;
}
