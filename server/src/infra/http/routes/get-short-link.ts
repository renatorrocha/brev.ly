import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import {
	getShortLink,
	getShortLinkInput,
} from "@/app/functions/get-short-link";

export const getShortLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links/:shortLink",
		{
			schema: {
				summary: "Get a short link",
				tags: ["links"],
				params: getShortLinkInput,
				response: {
					201: z.object({
						originalLink: z.url(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const shortLinkData = await getShortLink({ id });

			if (!shortLinkData) {
				return reply.status(404).send({
					message: "Short URL not found",
				});
			}

			return reply.status(201).send(shortLinkData);
		},
	);
};
