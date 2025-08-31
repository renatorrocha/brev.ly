import { Button } from "@/components/ui/button";
import { Copy, Trash } from "phosphor-react";

interface LinkCardProps {
	originalLink: string;
	shortLink: string;
	clicks: number;
}

export function LinkCard({ originalLink, shortLink, clicks }: LinkCardProps) {
	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex flex-col gap-1 overflow-hidden">
				<a
					href={shortLink}
					className="text-blue-base text-md hover:underline truncate"
				>
					{shortLink}
				</a>
				<a
					href={originalLink}
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

				<Button type="button">
					<Trash size={16} />
				</Button>
			</div>
		</div>
	);
}
