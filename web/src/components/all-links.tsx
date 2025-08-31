import type { Link } from "@/lib/queries/links/get-links";
import { cn } from "@/lib/utils";
import { DownloadSimple } from "phosphor-react";
import { LinkCard } from "./link-card";
import { Button } from "./ui/button";

export function AllLinks({
	className,
	links,
}: { className: string; links: Link[] }) {
	return (
		<div
			className={cn(
				"bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-5 min-h-[400px]",
				className,
			)}
		>
			<div className="flex items-center justify-between">
				<h1 className="text-lg text-gray-600">Meus links</h1>

				<Button className="flex items-center gap-2">
					<DownloadSimple size={16} />
					<p className="text-sm text-gray-500">Baixar CSV</p>
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				{links.map((link) => (
					<LinkCard
						key={link.id}
						originalLink={link.originalLink}
						shortLink={link.shortLink}
						clicks={link.clicks}
						id={link.id}
					/>
				))}

				{links.length === 0 && (
					<p className="text-sm text-gray-500 w-full text-center">
						Nenhum link encontrado
					</p>
				)}
			</div>
		</div>
	);
}
