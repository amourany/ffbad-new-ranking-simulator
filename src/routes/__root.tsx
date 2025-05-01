import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Layout } from '@templates/Layout';

export const Route = createRootRoute({
	component: () => (
		<Layout><Outlet/></Layout>
	),
});
