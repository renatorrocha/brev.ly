import { api } from "@/lib/integrations/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { linksKey } from "./keys";

async function deleteLink(id: string) {
	const { data } = await api.delete(`/links/${id}`);

	return data;
}

export const DeleteLinkMutation = (id: string) => {
	return useMutation({
		mutationKey: [linksKey],
		mutationFn: () => deleteLink(id),
		onSuccess: () => {
			toast.success("Link deletado com sucesso");
		},
	});
};
