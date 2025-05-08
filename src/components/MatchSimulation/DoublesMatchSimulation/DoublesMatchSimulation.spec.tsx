import { render } from '@jestConfig/render';
import {
	femalePlayerInfo,
	malePlayerInfo,
} from '@jestConfig/__mocks__/playerInfoMock';
import { DoublesMatchSimulation } from '@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation';

jest.mock('@components/MatchOutcome/MatchOutcome', () => ({
	MatchOutcome: () => <div>MatchOutcome</div>,
}));

jest.mock('@engine/simulation/simulate-match', () => ({
	simulateDoublesMatch: () => [
		{ losses: 0,
			wins: 1 },
		{ losses: 1,
			wins: 0 },
	],
}));

jest.mock('@engine/simulation/simulate-points-distribution', () => ({
	simulatePointsDistribution: jest.fn(),
}));

describe('DoublesMatchSimulation', () => {
	it('should render for large variation', () => {
		const { container } = render(
			<DoublesMatchSimulation
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={malePlayerInfo}
				playerC={femalePlayerInfo}
				playerD={femalePlayerInfo}
				rankingExtractor={(player) => player.convertedRankings.mixedRate}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="outcomes"
      >
        <div>
          MatchOutcome
        </div>
        <div>
          MatchOutcome
        </div>
      </div>
    `);
	});

	it('should render for small variation', () => {
		const { container } = render(
			<DoublesMatchSimulation
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={malePlayerInfo}
				playerC={femalePlayerInfo}
				playerD={femalePlayerInfo}
				rankingExtractor={(player) => player.convertedRankings.mixedRate}
				variant={'small'}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="outcomes"
      >
        <div>
          MatchOutcome
        </div>
      </div>
    `);
	});

	it('should register points when function is provided', () => {
		const registerPoints = jest.fn();
		render(
			<DoublesMatchSimulation
				isTeamAWinning={true}
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={malePlayerInfo}
				playerC={femalePlayerInfo}
				playerD={femalePlayerInfo}
				rankingExtractor={(player) => player.convertedRankings.mixedRate}
				registerOutcomePoints={registerPoints}
				variant={'small'}
			/>,
		);

		expect(registerPoints).toHaveBeenCalled();
	});
});
