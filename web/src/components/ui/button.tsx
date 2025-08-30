import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={`px-2 bg-gray-200 h-8 rounded-md ${className || ""}`}
			{...props}
		>
			{children}
		</button>
	);
}
