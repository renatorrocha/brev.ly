import { api } from "@/lib/integrations/axios";
import { queryOptions } from "@tanstack/react-query";
import { linksKey } from "./keys";

export interface Link {
	id: string;
	originalLink: string;
	shortLink: string;
	clicks: number;
}

async function fetchLink(shortLink: string): Promise<Link[]> {
	const { data } = await api.get("/links");

	return data;
}

export const LinkQueryOptions = (shortLink: string) => {
	return queryOptions({
		queryKey: [linksKey],
		queryFn: () => fetchLink(shortLink),
	});
};
