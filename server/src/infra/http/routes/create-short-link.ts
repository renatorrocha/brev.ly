import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import {
	createShortLink,
	createShortLinkInput,
} from "@/app/functions/create-short-link";

export const createShortLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a short link",
				tags: ["links"],
				body: createShortLinkInput,
				response: {
					201: z.object({
						shortUrl: z.string(),
						originalUrl: z.url(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl, shortUrl } = request.body;

			const shortLink = await createShortLink({ originalUrl, shortUrl });

			if (!shortLink) {
				return reply.status(400).send({
					message: "Short URL already exists",
				});
			}

			return reply.status(201).send(shortLink);
		},
	);
};
