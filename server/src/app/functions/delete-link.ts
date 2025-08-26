import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export const deleteLinkInput = z.object({
	id: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(input: DeleteLinkInput) {
	const { id } = input;

	const existingShortLink = await db.query.short_links.findFirst({
		where: eq(schema.short_links.id, id),
	});

	if (!existingShortLink) {
		return { success: false, message: "Link not found" };
	}

	await db.delete(schema.short_links).where(eq(schema.short_links.id, id));

	return { success: true, message: "Link deleted successfully" };
}
