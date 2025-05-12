import { Navigate, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: () => <Navigate to="/convert" />,
});

