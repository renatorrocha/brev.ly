import { z } from "zod";

export const linkSchema = z.object({
	id: z.string(),
	originalLink: z.url({ error: "URL original inválida" }),
	shortLink: z
		.string()
		.min(3, "URL encurtada precisa ter pelo menos 3 caracteres"),
	clicks: z.coerce.number(),
	createdAt: z.coerce.date(),
});

export const createLinkSchema = linkSchema.pick({
	originalLink: true,
	shortLink: true,
});

export type LinkSchema = z.infer<typeof linkSchema>;
export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
