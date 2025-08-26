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
						shortLink: z.string(),
						originalLink: z.url(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { originalLink, shortLink } = request.body;

			const shortLinkData = await createShortLink({ originalLink, shortLink });

			if (!shortLinkData) {
				return reply.status(400).send({
					message: "Short URL already exists",
				});
			}

			return reply.status(201).send(shortLinkData);
		},
	);
};
