import { api } from "@/lib/integrations/axios";
import { useMutation } from "@tanstack/react-query";
import { linksKey } from "./keys";

async function incrementAccess(id: string) {
	const { data } = await api.post(`/links/${id}/increment-access`);

	return data;
}

export const IncrementAccessMutation = () => {
	return useMutation({
		mutationKey: [linksKey],
		mutationFn: (id: string) => incrementAccess(id),
	});
};
