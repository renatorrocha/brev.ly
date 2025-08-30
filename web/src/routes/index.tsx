import Logo from "@/assets/logo.svg";
import { AllLinks } from "@/components/all-links";
import { NewLinkForm } from "@/components/new-link-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-gray-200 py-8 px-3 flex flex-col items-center justify-center max-w-7xl mx-auto">
			<figure className="mb-6 lg:self-start">
				<img src={Logo} alt="logo" />
			</figure>

			<div className="w-full flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
				<NewLinkForm className="lg:col-span-1" />

				<AllLinks className="lg:col-span-2" />
			</div>
		</div>
	);
}
