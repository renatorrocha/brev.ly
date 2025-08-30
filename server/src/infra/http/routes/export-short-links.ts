import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { exportShortLinks } from "@/app/functions/export-shot-links";

export const exportShortLinksRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links/export",
		{
			schema: {
				summary: "Export all short links",
				tags: ["links"],
				querystring: z.object({
					searchQuery: z.string().optional(),
				}),
				response: {
					200: z.object({
						reportUrl: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { searchQuery } = request.query;

			const { reportUrl } = await exportShortLinks({
				searchQuery,
			});

			return reply.status(200).send({ reportUrl });
		},
	);
};
