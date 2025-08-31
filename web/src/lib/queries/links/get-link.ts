import { api } from "@/lib/integrations/axios";
import { useQuery } from "@tanstack/react-query";
import { linksKey } from "./keys";

export interface Link {
	id: string;
	originalLink: string;
	shortLink: string;
	clicks: number;
}

async function fetchLink(id: string): Promise<Link> {
	const { data } = await api.get(`/links/${id}`);

	return data;
}

export const LinkQuery = (id: string) => {
	return useQuery({
		queryKey: [linksKey, id],
		queryFn: () => fetchLink(id),
	});
};
