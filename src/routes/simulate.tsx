import { createFileRoute } from '@tanstack/react-router';
import { MatchSimulatorPage } from '@pages/MatchSimulatorPage/MatchSimulatorPage';

export type SimulateRouteSearch = {
	playerA?: number;
	playerB?: number;
};

const Index = () => (
	<MatchSimulatorPage />
);

export const Route = createFileRoute('/simulate')({
	component: Index,
	validateSearch: (search: Record<string, unknown>): SimulateRouteSearch => ({
		playerA: search.playerA ? Number(search.playerA) : undefined,
		playerB: search.playerB ? Number(search.playerB) : undefined,
	}),
});

