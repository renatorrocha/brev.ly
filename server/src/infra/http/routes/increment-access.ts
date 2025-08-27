import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import {
	incrementAccess,
	incrementAccessInput,
} from "@/app/functions/increment-access";

export const incrementAccessRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links/:shortLink/increment-access",
		{
			schema: {
				summary: "Increment access to a short link",
				tags: ["links"],
				params: incrementAccessInput,
				response: {
					201: z.object({
						message: z.string(),
					}),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { shortLink } = request.params;

			const result = await incrementAccess({ shortLink });

			if (!result) {
				return reply.status(404).send({
					message: "Short URL not found",
				});
			}

			return reply.status(201).send({
				message: "Access incremented",
			});
		},
	);
};
