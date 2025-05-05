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
	it('should render', () => {
		const { container } = render(
			<SinglesMatchSimulation
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

});
