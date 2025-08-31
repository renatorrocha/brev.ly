import { z } from "zod";

const envSchema = z.object({
	VITE_FRONTEND_URL: z.url(),
	VITE_BACKEND_URL: z.url(),
});

export const env = envSchema.parse(import.meta.env);
