import { createFileRoute } from '@tanstack/react-router';
import { ClubTournamentResultsPage } from '@pages/ClubTournamentResultsPage/ClubTournamentResultsPage';

const Index = () => (
	<ClubTournamentResultsPage />
);

export const Route = createFileRoute('/club-podiums')({
	component: Index,
});

