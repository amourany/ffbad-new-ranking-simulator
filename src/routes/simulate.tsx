import { createFileRoute } from '@tanstack/react-router';
import { MatchSimulatorPage } from '@pages/MatchSimulatorPage/MatchSimulatorPage';

export type SimulateRouteSearch = {
	playerA?: number;
	playerB?: number;
	playerC?: number;
	playerD?: number;
};

const Index = () => (
	<MatchSimulatorPage />
);

export const Route = createFileRoute('/simulate')({
	component: Index,
	validateSearch: (search: Record<string, unknown>): SimulateRouteSearch => ({
		playerA: search.playerA ? Number(search.playerA) : undefined,
		playerB: search.playerB ? Number(search.playerB) : undefined,
		playerC: search.playerC ? Number(search.playerC) : undefined,
		playerD: search.playerD ? Number(search.playerD) : undefined,
	}),
});

