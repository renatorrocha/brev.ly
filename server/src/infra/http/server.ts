import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "@/env";
import { createShortLinkRoute } from "./routes/create-short-link";
import { deleteShortLinkRoute } from "./routes/delete-short-link";
import { exportShortLinksRoute } from "./routes/export-short-links";
import { getAllShortLinksRoute } from "./routes/get-all-short-links";
import { getShortLinkRoute } from "./routes/get-short-link";
import { incrementAccessRoute } from "./routes/increment-access";

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	console.error(error);

	return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyMultipart);
server.register(fastifyCors, {
	origin: "*",
});

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly API",
			description: "API for the Brev.ly URL shortener",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

server.get("/openapi.json", () => server.swagger());

server.register(scalarUI, {
	routePrefix: "/docs",
	configuration: {
		layout: "modern",
		theme: "elysiajs",
	},
});

server.register(createShortLinkRoute);
server.register(getShortLinkRoute);
server.register(deleteShortLinkRoute);
server.register(getAllShortLinksRoute);
server.register(incrementAccessRoute);
server.register(exportShortLinksRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log(`HTTP Server running on port ${env.PORT}!`);
});
