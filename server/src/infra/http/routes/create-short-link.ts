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
						originalUrl: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalUrl } = request.body;

			const shortLink = await createShortLink({ originalUrl }, request);

			if (!shortLink) {
				return reply.status(400).send({
					message: "Invalid URL",
				});
			}

			return reply.status(201).send(shortLink);
		},
	);
};
