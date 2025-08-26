import { eq } from "drizzle-orm";
import z from "zod";
import { NotFound } from "@/app/functions/errors/not-found";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const getShortLinkInput = z.object({
	shortLink: z.string(),
});

type GetShortLinkInput = z.input<typeof getShortLinkInput>;

export async function getShortLink(input: GetShortLinkInput) {
	const { shortLink } = input;

	const shortLinkData = await db.query.short_links.findFirst({
		where: eq(schema.short_links.shortLink, shortLink),
	});

	if (!shortLinkData) {
		throw new NotFound();
	}

	return shortLinkData;
}
