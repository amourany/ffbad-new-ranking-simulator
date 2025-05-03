import { createLazyFileRoute } from '@tanstack/react-router';
import { MatchSimulatorPage } from '@pages/MatchSimulatorPage/MatchSimulatorPage';

const Index = () => (
	<MatchSimulatorPage />
);

export const Route = createLazyFileRoute('/')({
	component: Index,
});

