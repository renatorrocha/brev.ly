import Logo from "@/assets/logo.svg";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$short-link")({
	component: RouteComponent,
});

function RouteComponent() {
	const { "short-link": shortLink } = Route.useParams();

  

	return (
		<div className="justify-center items-center h-screen">
			<div>
				{" "}
				<img src={Logo} alt="logo" />
				<p>Redirecionando...</p>
				<p>O link será aberto automaticamente em alguns instantes. </p>
				<p>
					Não foi redirecionado? <a href="/">Acesse aqui</a>
				</p>
			</div>
		</div>
	);
}
