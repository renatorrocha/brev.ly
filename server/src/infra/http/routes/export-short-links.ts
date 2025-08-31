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
				response: {
					200: z.object({
						reportUrl: z.string(),
					}),
				},
			},
		},
		async (_, reply) => {
			const { reportUrl } = await exportShortLinks();

			return reply.status(200).send({ reportUrl });
		},
	);
};
