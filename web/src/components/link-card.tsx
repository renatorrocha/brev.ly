import { Button } from "@/components/ui/button";
import { Copy, Trash } from "phosphor-react";

interface LinkCardProps {
	originalLink: string;
	shortLink: string;
	clicks: number;
}

export function LinkCard({ originalLink, shortLink, clicks }: LinkCardProps) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col gap-1">
				<p className="text-blue-base text-md">{shortLink}</p>
				<p className="text-gray-500 text-sm">{originalLink}</p>
			</div>

			<p className="text-sm text-gray-500">{clicks} acessos</p>

			<div className="flex gap-2 items-center">
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
