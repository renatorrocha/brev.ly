import type { FastifyRequest } from "fastify";
import { z } from "zod";
import { nanoid } from "@/app/functions/nano-id";
import { env } from "@/env";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const createShortLinkInput = z.object({
	originalUrl: z.url(),
});

type CreateShortLinkInput = z.input<typeof createShortLinkInput>;

export async function createShortLink(
	input: CreateShortLinkInput,
	request: FastifyRequest,
) {
	const { originalUrl } = input;

	const shortUrl = nanoid();

	const protocol = request.protocol;
	const host = request.hostname;
	const port = env.PORT;
	const baseUrl = `${protocol}://${host}:${port}`;

	const [shortLink] = await db
		.insert(schema.short_links)
		.values({
			originalUrl,
			shortUrl: `${baseUrl}/links/${shortUrl}`,
			clicks: 0,
		})
		.returning();

	return shortLink;
}
