import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

export function getContext() {
	const queryClient = new QueryClient({
		mutationCache: new MutationCache({
			onSuccess: () => {
				queryClient.invalidateQueries();
			},
		}),
	});
	return {
		queryClient,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
