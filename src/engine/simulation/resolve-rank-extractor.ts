import { PlayerInfo } from '@api/player-ranking/useFetchPlayerRankings';

export const singlesExtractor = (player: PlayerInfo) => player.rankings.singleRate;
export const doublesExtractor = (player: PlayerInfo) => player.rankings.doubleRate;
export const mixedDoublesExtractor = (player: PlayerInfo) => player.rankings.mixedRate;

export const resolveExtractor = (isDoublesMatch: boolean, isCrossGenderMatch: boolean, isMixedDoubles: boolean) => {
	if(!isDoublesMatch) {
		return singlesExtractor;
	}
	const mixedOrCrossGenderExtractor = isCrossGenderMatch ?  doublesExtractor: mixedDoublesExtractor;
	return isMixedDoubles ?  mixedOrCrossGenderExtractor:doublesExtractor;
};
