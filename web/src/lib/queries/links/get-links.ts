import { api } from "@/lib/integrations/axios";
import { queryOptions } from "@tanstack/react-query";
import { linksKey } from "./keys";

export interface Link {
	id: string;
	originalLink: string;
	shortLink: string;
	clicks: number;
}

async function fetchLinks(): Promise<Link[]> {
	const { data } = await api.get("/links");

	return data;
}

export const LinksQueryOptions = () => {
	return queryOptions({
		queryKey: [linksKey],
		queryFn: () => fetchLinks(),
	});
};
