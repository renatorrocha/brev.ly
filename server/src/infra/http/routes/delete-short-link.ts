import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteLink, deleteLinkInput } from "@/app/functions/delete-link";

export const deleteShortLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/links/:id",
		{
			schema: {
				summary: "Delete a short link",
				tags: ["links"],
				params: deleteLinkInput,
				response: {
					200: z.object({
						success: z.boolean(),
						message: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params;

			const { success, message } = await deleteLink({ id });

			if (!success) {
				return reply.status(400).send({
					message,
				});
			}

			return reply.status(200).send({
				success,
				message,
			});
		},
	);
};
