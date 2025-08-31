import { api } from "@/lib/integrations/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { linksKey } from "./keys";

async function generateLinksReport() {
	const { data } = await api.post("/links/export");

	return data;
}

export const GenerateLinksReportMutation = () => {
	return useMutation({
		mutationKey: [linksKey],
		mutationFn: () => generateLinksReport(),
		onSuccess: (data) => {
			toast.success("Relatório gerado com sucesso", {
				description: "Acesse o relatório no link ao lado",
				action: {
					onClick: () => window.open(data.reportUrl, "_blank"),
					type: "button",
					label: "Action",
				},
			});
		},
	});
};
