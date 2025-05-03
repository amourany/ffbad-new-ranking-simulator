import { Outcome, WINS } from '@engine/simulation/simulate-match';
import { pointsRepartitionTable } from '@engine/simulation/points-repartition-table';

export const simulatePointsDistribution = (playerARanking: number, playerBRanking: number, pointsToShare: number, matchOutcome: Outcome):number => {
	const rankingDelta = Math.abs(playerARanking - playerBRanking);
	const repartitionTableEntry = Object.entries(pointsRepartitionTable)
		.filter(([
			key,
		]) => rankingDelta >= Number(key))
		.sort((a, b) => Number(b[0]) - Number(a[0]))
		.map(([
			_,
			value,
		]) => value)[0];

	if (matchOutcome === WINS) {
		if(playerARanking > playerBRanking) {
			return Math.round(pointsToShare * repartitionTableEntry.winningHigherRankedPlayerRatio);
		} else {
			return Math.round(pointsToShare * repartitionTableEntry.winningLowerRankedPlayerRatio);
		}
	} else {
		if(playerARanking > playerBRanking) {
			return Math.round(pointsToShare * repartitionTableEntry.losingHigherRankedPlayerRatio);
		} else {
			return Math.round(pointsToShare * repartitionTableEntry.losingLowerRankedPlayerRatio);
		}
	}
};
