import { RenderHookResult, renderHook as testingLibraryRenderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, UseQueryResult } from '@tanstack/react-query';

const queryClient = new QueryClient(
	{
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	},
);

export const tanstackWrapper =  ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);

export function renderTanstackQueryHook<Props>(hook: () => UseQueryResult): RenderHookResult<UseQueryResult, Props> {

	return testingLibraryRenderHook(hook, {
		wrapper: tanstackWrapper,
	});
}
