import { Button } from "@/components/ui/button";
import { DeleteLinkMutation } from "@/lib/queries/links/delete-link";
import type { Link } from "@/lib/queries/links/get-links";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Copy, Trash } from "phosphor-react";
import { toast } from "sonner";

export function LinkCard({ originalLink, shortLink, clicks, id }: Link) {
	const { mutate: deleteLink } = DeleteLinkMutation(id);

	async function handleDeleteLink() {
		const confirm = window.confirm(
			`Tem certeza que deseja deletar o link brev.ly/${shortLink}?`,
		);

		if (confirm) {
			deleteLink();
		}
	}

	async function handleCopyLink() {
		await navigator.clipboard.writeText(originalLink);
		toast.info("Link copiado para a área de transferência");
	}

	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex flex-col gap-1 overflow-hidden">
				<TanstackLink
					to={"/$short-link"}
					params={{ "short-link": shortLink }}
					className="text-blue-base text-md hover:underline truncate"
				>
					{`brev.ly/${shortLink}`}
				</TanstackLink>

				<a
					href={originalLink}
					target="_blank"
					rel="noreferrer"
					className="text-gray-500 text-sm hover:underline truncate"
				>
					{originalLink}
				</a>
			</div>

			<div className="flex gap-2 items-center">
				<p className="text-sm text-gray-500 lg:mr-3">{clicks} acessos</p>

				<Button type="button" onClick={handleCopyLink}>
					<Copy size={16} />
				</Button>

				<Button type="button" onClick={handleDeleteLink}>
					<Trash size={16} />
				</Button>
			</div>
		</div>
	);
}
