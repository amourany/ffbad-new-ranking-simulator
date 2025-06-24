import { SinglesMatchSimulation } from './SinglesMatchSimulation';
import { render } from '@jestConfig/render';
import { femalePlayerInfo, malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';

jest.mock('@components/MatchOutcome/MatchOutcome', () => ({
	MatchOutcome: () => <div>MatchOutcome</div>,
}));

jest.mock('@engine/simulation/simulate-match', () => ({
	simulateSinglesMatch: () => [
		{ losses: 0,
			wins: 1 },
		{ losses: 1,
			wins: 0 },
	],
}));

describe('SinglesMatchSimulation', () => {
	it('should render for large variant', () => {
		const { container } = render(
			<SinglesMatchSimulation
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={femalePlayerInfo}
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

	it('should render for small variant', () => {
		const { container } = render(
			<SinglesMatchSimulation
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={femalePlayerInfo}
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
			<SinglesMatchSimulation
				isTeamAWinning={true}
				matchFactor={1}
				playerA={malePlayerInfo}
				playerB={malePlayerInfo}
				updateMatchResult={registerPoints}
				variant={'small'}
			/>,
		);

		expect(registerPoints).toHaveBeenCalled();
	});
});
