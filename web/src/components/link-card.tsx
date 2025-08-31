import { Button } from "@/components/ui/button";
import { DeleteLinkMutation } from "@/lib/queries/links/delete-link";
import type { Link } from "@/lib/queries/links/get-links";
import { Link as TanstackLink } from "@tanstack/react-router";
import { Copy, Trash } from "phosphor-react";

export function LinkCard({ originalLink, shortLink, clicks, id }: Link) {
	const { mutate: deleteLink } = DeleteLinkMutation(id);

	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex flex-col gap-1 overflow-hidden">
				<TanstackLink
					to={"/$short-link"}
					params={{ "short-link": shortLink }}
					className="text-blue-base text-md hover:underline truncate"
				>
					{`Brev.ly/${shortLink}`}
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

				<Button type="button">
					<Copy size={16} />
				</Button>

				<Button type="button" onClick={() => deleteLink()}>
					<Trash size={16} />
				</Button>
			</div>
		</div>
	);
}
