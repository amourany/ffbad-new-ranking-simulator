import { PlayerInfo } from '@api/player-ranking/useFetchPlayersRankings';
import { matchSimulationTable } from '@engine/match-simulation-table';

export type Match= {
	me?: PlayerInfo;
	opponent?: PlayerInfo;
};

export type MatchResult = {
	wins: number;
	losses: number;
};

export const simulateMatch = (me: number, opponent: number): MatchResult[] => {
	const rankingDelta = Math.abs(me - opponent);
	const matchSimulationTableEntry = Object.entries(matchSimulationTable)
		.filter(([
			key,
		]) => rankingDelta >= Number(key))
		.sort((a, b) => Number(b[0]) - Number(a[0]))
		.map(([
			_,
			value,
		]) => value)[0];

	const matchResult: MatchResult[] = [
		{
			losses: matchSimulationTableEntry.higherRankedPlayerWinsPointsForLoser,
			wins: matchSimulationTableEntry.higherRankedPlayerWinsPointsForWinner,
		},
		{
			losses: matchSimulationTableEntry.lowerRankedPlayerWinsPointsForLoser,
			wins: matchSimulationTableEntry.lowerRankedPlayerWinsPointsForWinner,
		},
	];

	if(me! > opponent!) {
		return matchResult;
	} else {
		return matchResult.reverse();
	}
};

export const extractSingleRanking = (playerInfo: PlayerInfo) => playerInfo.rankings.singleRate;
export const extractDoubleRanking = (playerInfo: PlayerInfo) => playerInfo.rankings.doubleRate;
export const extractMixedRanking = (playerInfo: PlayerInfo) => playerInfo.rankings.mixedRate;
