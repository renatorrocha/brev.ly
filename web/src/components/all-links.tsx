import { DownloadSimple } from "phosphor-react";
import { LinkCard } from "./link-card";
import { Button } from "./ui/button";

export function AllLinks() {
	return (
		<div className="bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-5">
			<div className="flex items-center justify-between">
				<h1 className="text-lg text-gray-600">Meus links</h1>

				<Button className="flex items-center gap-2">
					<DownloadSimple size={16} />
					<p className="text-sm text-gray-500">Baixar CSV</p>
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				<LinkCard
					id="1"
					originalLink="https://www.google.com"
					shortLink="https://www.asdasd.com"
					clicks={10}
				/>
			</div>
		</div>
	);
}
