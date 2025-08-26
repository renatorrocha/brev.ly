import { db } from "@/infra/db";

export async function getAllShortLinks() {
	const shortLinkData = await db.query.short_links.findMany();

	return shortLinkData;
}
