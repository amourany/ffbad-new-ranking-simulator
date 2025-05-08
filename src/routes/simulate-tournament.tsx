import { createFileRoute } from '@tanstack/react-router';
import { TournamentSimulationPage } from '@pages/TournamentSimulationPage/TournamentSimulationPage';

const Index = () => (
	<TournamentSimulationPage />
);

export const Route = createFileRoute('/simulate-tournament')({
	component: Index,
});

