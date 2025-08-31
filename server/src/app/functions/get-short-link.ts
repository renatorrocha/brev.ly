import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const getShortLinkInput = z.object({
	id: z.string(),
});

type GetShortLinkInput = z.input<typeof getShortLinkInput>;

export async function getShortLink(input: GetShortLinkInput) {
	const { id } = input;

	const shortLinkData = await db.query.short_links.findFirst({
		where: eq(schema.short_links.id, id),
	});

	if (!shortLinkData) {
		return null;
	}

	return shortLinkData;
}
