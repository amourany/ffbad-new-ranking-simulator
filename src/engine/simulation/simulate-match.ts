import {
	MatchSimulationTable,
	matchSimulationTableForDoubles,
	matchSimulationTableForSingles,
} from './match-simulation-table';
import { Gender } from '@api/player-ranking/useFetchPlayerRankings';

export const WINS = 'wins';
export const LOSES = 'loses';
export type Outcome = typeof WINS | typeof LOSES;

export type MatchResult = {
	wins: number;
	losses: number;
};

const simulateMatch = (matchSimulationTable: MatchSimulationTable) => (playerA: number, playerB: number, multiplyingFactor: number): MatchResult[] => {
	const rankingDelta = Math.abs(playerA - playerB);
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
			losses: computePoints(matchSimulationTableEntry.higherRankedPlayerWinsPointsForLoser, multiplyingFactor),
			wins: computePoints(matchSimulationTableEntry.higherRankedPlayerWinsPointsForWinner, multiplyingFactor),
		},
		{
			losses: computePoints(matchSimulationTableEntry.lowerRankedPlayerWinsPointsForLoser, multiplyingFactor),
			wins: computePoints(matchSimulationTableEntry.lowerRankedPlayerWinsPointsForWinner, multiplyingFactor),
		},
	];

	if(playerA! > playerB!) {
		return matchResult;
	} else {
		return matchResult.reverse();
	}
};

const computePoints = (points: number, factor: number): number => Math.round(points * factor);

export const simulateSinglesMatch = simulateMatch(matchSimulationTableForSingles);
export const simulateDoublesMatch = simulateMatch(matchSimulationTableForDoubles);

export const isMixedDoublesTeam = (playerAGender: Gender|undefined, playerBGender: Gender|undefined): boolean => !!playerAGender && !!playerBGender && playerAGender !== playerBGender;
