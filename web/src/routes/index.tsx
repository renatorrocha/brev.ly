import Logo from "@/assets/logo.svg";
import { AllLinks } from "@/components/all-links";
import { NewLinkForm } from "@/components/new-link-form";
import { LinksQueryOptions } from "@/lib/queries/links/get-links";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	loader: (opts) => {
		opts.context.queryClient.ensureQueryData(LinksQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const linksQuery = useSuspenseQuery(LinksQueryOptions());
	const links = linksQuery.data;

	return (
		<div className="py-8 px-3 flex flex-col items-center justify-center">
			<figure className="mb-6 lg:self-start">
				<img src={Logo} alt="logo" />
			</figure>

			<div className="w-full flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-5">
				<NewLinkForm className="lg:col-span-1" />

				<AllLinks className="lg:col-span-2" links={links} />
			</div>
		</div>
	);
}
