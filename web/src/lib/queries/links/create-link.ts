import { api } from "@/lib/integrations/axios";
import type { CreateLinkSchema } from "@/lib/schemas/link";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { linksKey } from "./keys";

async function createLink(link: CreateLinkSchema) {
	const { data } = await api.post("/links", link);

	return data;
}

export const CreateLinkMutation = () => {
	return useMutation({
		mutationKey: [linksKey],
		mutationFn: (data: CreateLinkSchema) => createLink(data),
		onSuccess: () => {
			toast.success("Link criado com sucesso");
		},
		onError: (error: unknown) => {
			console.error(error);
			toast.error("Erro ao criar link", {
				description:
					(error as AxiosError<{ message: string }>).response?.data?.message ===
					"Short URL already exists"
						? "URL encurtada já existe"
						: "Erro ao criar link",
			});
		},
	});
};
