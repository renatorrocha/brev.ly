import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { getAllShortLinks } from "@/app/functions/get-all-short-links";

export const getAllShortLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/links",
		{
			schema: {
				summary: "Get all short links",
				tags: ["links"],
				response: {
					200: z.array(
						z.object({
							originalLink: z.url(),
							id: z.string(),
							shortLink: z.string(),
							clicks: z.number(),
							createdAt: z.date(),
						}),
					),
				},
			},
		},
		async (_, reply) => {
			const shortLinkData = await getAllShortLinks();

			return reply.status(200).send(shortLinkData);
		},
	);
};
