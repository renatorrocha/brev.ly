import Logo from "@/assets/logo.svg";
import { LinkQuery } from "@/lib/queries/links/get-link";
import { IncrementAccessMutation } from "@/lib/queries/links/increment-access";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/$short-link-id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { "short-link-id": shortLink } = Route.useParams();

	const { data: link, isSuccess, isLoading } = LinkQuery(shortLink);
	const { mutate: incrementAccess, isSuccess: incrementSuccess } =
		IncrementAccessMutation();

	useEffect(() => {
		if (link?.id && isSuccess) {
			incrementAccess(link.id);
		}
	}, [link?.id, incrementAccess, isSuccess]);

	useEffect(() => {
		if (isSuccess && incrementSuccess && link?.originalLink) {
			window.open(link.originalLink, "_blank");
		}
	}, [isSuccess, incrementSuccess, link?.originalLink]);

	if (!isSuccess && !isLoading) {
		return <Navigate to="/not-found" />;
	}

	return (
		<div className="justify-center items-center flex h-screen">
			<div className="flex flex-col items-center gap-6 bg-gray-100 size-fit px-12 py-16 rounded-lg text-center">
				<img src={Logo} alt="logo" />
				<p>Redirecionando...</p>
				<div className="flex flex-col items-center gap-2">
					<p>O link será aberto automaticamente em alguns instantes. </p>
					<p>
						Não foi redirecionado? <a href="/">Acesse aqui</a>
					</p>
				</div>
			</div>
		</div>
	);
}
