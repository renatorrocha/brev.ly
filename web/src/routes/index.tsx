import Logo from "@/assets/logo.svg";
import { AllLinks } from "@/components/all-links";
import { NewLinkForm } from "@/components/new-link-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="bg-gray-200 py-8 px-3 flex flex-col items-center justify-center">
			<figure className="mb-6">
				<img src={Logo} alt="logo" />
			</figure>

			<div className="w-full flex flex-col gap-3">
				<NewLinkForm />

				<AllLinks />
			</div>
		</div>
	);
}
