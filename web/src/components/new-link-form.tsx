import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewLinkForm({ className }: { className: string }) {
	return (
		<form
			className={cn(
				"bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-5",
				className,
			)}
		>
			<h1 className="text-lg text-gray-600">Novo link</h1>

			<div className="space-y-4">
				<Input
					id="original-link"
					label="LINK ORIGINAL"
					placeholder="www.exemplo.com.br"
				/>

				<Input id="short-link" label="LINK ENCURTADO" placeholder="brev.ly/" />

				<button
					type="submit"
					className="px-5 rounded-lg text-md bg-blue-base text-white w-full h-12"
				>
					Salvar link
				</button>
			</div>
		</form>
	);
}
