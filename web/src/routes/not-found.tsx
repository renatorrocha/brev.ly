import NotFound from "@/assets/404.svg";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="justify-center items-center flex h-screen">
			<div className="flex flex-col items-center gap-6 bg-gray-100 size-fit px-12 py-16 rounded-lg text-center">
				<img src={NotFound} alt="not found" />
				<p className="text-xl text-gray-600">Link não encontrado</p>
				<p className="text-md text-gray-500">
					O link que você está tentando acessar não existe, foi removido ou
					<br />é uma URL inválida. Saiba mais em{" "}
					<Link to="/" className="text-blue-base text-md">
						brev.ly
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
