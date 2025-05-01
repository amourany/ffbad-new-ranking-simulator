import { createLazyFileRoute } from '@tanstack/react-router';
import { HomePage } from '@pages/HomePage/HomePage';

const Index = () => (
	<HomePage />
);

export const Route = createLazyFileRoute('/')({
	component: Index,
});

