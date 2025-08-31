import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			className={cn(
				"px-2 bg-gray-200 h-8 rounded-md cursor-pointer border border-transparent hover:border-blue-base",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
