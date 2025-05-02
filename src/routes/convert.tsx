import { createFileRoute } from '@tanstack/react-router';
import { ConverterPage } from '@pages/ConverterPage/ConverterPage';

const Index = () => (
	<ConverterPage />
);

export const Route = createFileRoute('/convert')({
	component: Index,
});

