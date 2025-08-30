import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const baseInput = tv({
	base: "w-full px-4 rounded-lg h-[48px] border placeholder:text-gray-400 text-gray-600",
	variants: {
		status: {
			default: "border-gray-300 active:border-blue-base focus:border-blue-base",
			error: "border-feedback-danger",
		},
	},
	defaultVariants: {
		status: "default",
	},
});

export type InputProps = ComponentProps<"input"> &
	VariantProps<typeof baseInput> & {
		label: string;
		errorMessage?: string;
	};

export function Input({
	id,
	label,
	placeholder,
	status,
	errorMessage,
	...props
}: InputProps) {
	return (
		<div className="group flex flex-col gap-2">
			<label
				htmlFor={id}
				className={`text-sm font-medium transition-colors duration-200 ${
					status === "error" ? "text-feedback-danger" : "text-gray-700"
				}`}
			>
				{label}
			</label>

			<input
				id={id}
				type="text"
				className={baseInput({ status })}
				placeholder={placeholder}
				{...props}
			/>

			{errorMessage && status === "error" && (
				<p className="text-sm text-feedback-danger">{errorMessage}</p>
			)}
		</div>
	);
}
