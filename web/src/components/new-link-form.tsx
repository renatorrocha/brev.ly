import { Input } from "@/components/ui/input";
import { CreateLinkMutation } from "@/lib/queries/links/create-link";
import { type CreateLinkSchema, createLinkSchema } from "@/lib/schemas/link";
import { cn } from "@/lib/utils";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Spinner } from "phosphor-react";
import { useForm } from "react-hook-form";

export function NewLinkForm({ className }: { className: string }) {
	const { mutate: createLink, isPending } = CreateLinkMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreateLinkSchema>({
		resolver: standardSchemaResolver(createLinkSchema),
		defaultValues: {
			originalLink: "",
			shortLink: "",
		},
		mode: "onChange",
	});

	async function onSubmit(data: CreateLinkSchema) {
		createLink(data, {
			onSuccess: () => {
				reset();
			},
		});
	}

	return (
		<form
			className={cn(
				"bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-5 h-fit",
				className,
			)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="text-lg text-gray-600">Novo link</h1>

			<div className="space-y-4">
				<Input
					id="original-link"
					label="LINK ORIGINAL"
					placeholder="www.exemplo.com.br"
					status={errors.originalLink ? "error" : "default"}
					{...register("originalLink")}
					errorMessage={errors.originalLink?.message}
				/>

				<Input
					id="short-link"
					label="LINK ENCURTADO"
					placeholder="brev.ly/"
					status={errors.shortLink ? "error" : "default"}
					{...register("shortLink")}
					errorMessage={errors.shortLink?.message}
				/>

				<button
					type="submit"
					className="px-5 rounded-lg text-md bg-blue-base cursor-pointer text-white w-full h-12 hover:bg-blue-dark duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={isPending}
				>
					{isPending ? <Spinner size={16} /> : "Salvar link"}
				</button>
			</div>
		</form>
	);
}
