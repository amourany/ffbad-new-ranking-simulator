import { render } from '@jestConfig/render';
import { DisplayNewRankings } from '@components/DisplayNewRankings/DisplayNewRankings';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';
import { screen } from '@testing-library/react';

jest.mock('@components/RankingSet/RankingSet', () => ({
	RankingSet: () => <div>RankingSet</div>,
}));

describe('DisplayNewRankings', () => {
	it('should render', () => {
		const { container } = render(
			<DisplayNewRankings
				onClear={jest.fn}
				playerInfo={malePlayerInfo}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="rankingDate"
        >
          RANKING_DATE
          intlDate
        </p>
        <span
          class="player"
        >
          John Doe
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
        </span>
        <div
          class="container"
        >
          <div
            class="tileContainer"
          >
            <p
              class="title"
            >
              CURRENT_RANKINGS
            </p>
            <div>
              RankingSet
            </div>
          </div>
          <div
            data-testid="mocked-icon-IconArrowRight"
          />
          <div
            class="tileContainer"
          >
            <p
              class="title"
            >
              NEW_RANKINGS
            </p>
            <div>
              RankingSet
            </div>
          </div>
        </div>
      </div>
    `);
	});

	it('should call on clear when clicking', () => {
		const onClear = jest.fn();
		render(
			<DisplayNewRankings
				onClear={onClear}
				playerInfo={malePlayerInfo}
			/>,
		);

		const button = screen.getByRole('button');
		button.click();
		expect(onClear).toHaveBeenCalled();
	});
});
