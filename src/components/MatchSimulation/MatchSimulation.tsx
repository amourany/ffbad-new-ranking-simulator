import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { DoublesMatchSimulation } from '@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation';
import { SinglesMatchSimulation } from '@components/MatchSimulation/SinglesMatchSimulation/SinglesMatchSimulation';
import { resolveExtractor } from '@engine/simulation/resolve-rank-extractor';

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
	matchConfiguration: MatchConfig;
	isTeamAWinning?: boolean;
	registerOutcomePoints?: (points: number) => void;
	variant?: 'small' | 'large';
};

export const MatchSimulation = ({ playerALicence, playerBLicence, playerCLicence, playerDLicence, matchConfiguration, isTeamAWinning, registerOutcomePoints, variant='large' }: MatchSimulationProps) => {

	const { matchMultiplyingFactor, isCrossGenderMatch, isMixedDoubles, isDoublesMatch } = matchConfiguration;

	const { data:playerA } = useFetchPlayerRankings(playerALicence);
	const { data:playerB } = useFetchPlayerRankings(playerBLicence);
	const { data:playerC } = useFetchPlayerRankings(playerCLicence);
	const { data:playerD } = useFetchPlayerRankings(playerDLicence);

	if (isDoublesMatch) {
		if (!!playerA && !!playerB && !!playerC && !!playerD) {
			const rankingExtractor = resolveExtractor(true, isCrossGenderMatch, isMixedDoubles);

			return <DoublesMatchSimulation
				isTeamAWinning={isTeamAWinning}
				matchFactor={matchMultiplyingFactor}
				playerA={playerA}
				playerB={playerB}
				playerC={playerC}
				playerD={playerD}
				rankingExtractor={rankingExtractor}
				registerOutcomePoints={registerOutcomePoints}
				variant={variant}
			/>;
		}
	} else {
		if (!!playerA && !!playerB) {
			return <SinglesMatchSimulation
				isTeamAWinning={isTeamAWinning}
				matchFactor={matchMultiplyingFactor}
				playerA={playerA}
				playerB={playerB}
				registerOutcomePoints={registerOutcomePoints}
				variant={variant}
			/>;
		}
	}
	return null;
};
