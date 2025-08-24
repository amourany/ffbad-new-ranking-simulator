import { render } from '@jestConfig/render';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';
import { screen } from '@testing-library/react';
import { DisplayPlayerRankings } from '@components/DisplayPlayerRankings/DisplayPlayerRankings';

jest.mock('@components/RankingSet/RankingSet', () => ({
	RankingSet: () => <div>RankingSet</div>,
}));

describe('DisplayPlayerRankings', () => {
	it('should render', () => {
		const { container } = render(
			<DisplayPlayerRankings
				onClear={jest.fn}
				playerInfo={malePlayerInfo}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="playerInMatch"
      >
        <div
          class="playerName"
        >
          John Doe
        </div>
        <div
          class="rankAndClear"
        >
          <div>
            RankingSet
          </div>
          <div
            class="clearButton"
          >
            <button
              aria-label="Clear"
              data-testid="ActionIcon"
              type="button"
            >
              <div
                data-testid="mocked-icon-IconX"
              />
            </button>
          </div>
        </div>
      </div>
    `);
	});

	it('should call on clear when clicking', () => {
		const onClear = jest.fn();
		render(
			<DisplayPlayerRankings
				onClear={onClear}
				playerInfo={malePlayerInfo}
			/>,
		);

		const button = screen.getByRole('button');
		button.click();
		expect(onClear).toHaveBeenCalled();
	});
});
