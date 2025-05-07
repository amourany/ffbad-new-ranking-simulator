import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from './theme';
import { TTL_1_HOUR } from '@api/api-constants';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: TTL_1_HOUR,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<App/>
				<ReactQueryDevtools
					buttonPosition="bottom-left"
					initialIsOpen={false}
				/>
			</QueryClientProvider>
		</MantineProvider>
	</StrictMode>,
);
