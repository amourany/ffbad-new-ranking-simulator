import { PlayerInfo, useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { DoublesMatchSimulation } from '@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation';
import { SinglesMatchSimulation } from '@components/MatchSimulation/SinglesMatchSimulation/SinglesMatchSimulation';

export type MatchConfig = {
	matchMultiplyingFactor: number;
	isCrossGenderMatch: boolean;
	isMixedDoubles: boolean;
	isDoublesMatch: boolean;
};

export type MatchSimulationProps = {
	playerALicence: number|undefined;
	playerBLicence: number|undefined;
	playerCLicence: number|undefined;
	playerDLicence: number|undefined;
	matchConfiguration: MatchConfig
};

export const MatchSimulation = ({ playerALicence, playerBLicence, playerCLicence, playerDLicence, matchConfiguration }: MatchSimulationProps) => {

	const { matchMultiplyingFactor, isCrossGenderMatch, isMixedDoubles, isDoublesMatch } = matchConfiguration;

	const { data:playerA } = useFetchPlayerRankings(playerALicence);
	const { data:playerB } = useFetchPlayerRankings(playerBLicence);
	const { data:playerC } = useFetchPlayerRankings(playerCLicence);
	const { data:playerD } = useFetchPlayerRankings(playerDLicence);

	if (isDoublesMatch) {
		if (!!playerA && !!playerB && !!playerC && !!playerD) {
			const mixedDoublesExtractor = (player: PlayerInfo) => player.convertedRankings.mixedRate;
			const doublesExtractor = (player: PlayerInfo) => player.convertedRankings.doubleRate;
			const mixedOrCrossGenderExtractor = isCrossGenderMatch ?  doublesExtractor: mixedDoublesExtractor;

			const rankingExtractor = isMixedDoubles ?  mixedOrCrossGenderExtractor:doublesExtractor;

			return <DoublesMatchSimulation
				matchFactor={matchMultiplyingFactor}
				playerA={playerA}
				playerB={playerB}
				playerC={playerC}
				playerD={playerD}
				rankingExtractor={rankingExtractor}
			/>;
		}
	} else {
		if (!!playerA && !!playerB) {
			return <SinglesMatchSimulation
				matchFactor={matchMultiplyingFactor}
				playerA={playerA}
				playerB={playerB}
			/>;
		}
	}
	return null;
};
