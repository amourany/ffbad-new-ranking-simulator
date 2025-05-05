import { ConverterPage } from './ConverterPage';
import { render } from '@jestConfig/render';
import { useFetchPlayersRankings } from '@api/player-ranking/useFetchPlayersRankings';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';

jest.mock('@api/player-ranking/useFetchPlayersRankings', () => ({
	useFetchPlayersRankings: jest.fn(),
}));

jest.mock('@components/DisplayNewRankings/DisplayNewRankings', () => ({
	DisplayNewRankings: () => <div>DisplayNewRankings</div>,
}));

jest.mock('@components/SearchPlayerInput/SearchPlayerInput', () => ({
	SearchPlayerInput: () => <div>SearchPlayerInput</div>,
}));

describe('ConverterPage', () => {
	it('should render with input untouched', () => {
		(useFetchPlayersRankings as jest.Mock).mockReturnValue([
			[
				'playerA',
				{ data: undefined },
			],
		]);

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1
            class="title"
          >
            TITLE
          </h1>
          <div>
            SearchPlayerInput
          </div>
        </div>
      </div>
    `);
	});

	it('should render when loading player information', () => {
		(useFetchPlayersRankings as jest.Mock).mockReturnValue([
			[
				'playerA',
				{ data: undefined,
					isLoading: true },
			],
		]);

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1
            class="title"
          >
            TITLE
          </h1>
          <div>
            SearchPlayerInput
          </div>
          <div>
            LOADING
          </div>
        </div>
      </div>
    `);
	});

	it('should render with player information', () => {
		(useFetchPlayersRankings as jest.Mock).mockReturnValue([
			[
				'playerA',
				{ data: malePlayerInfo,
					isLoading: false },
			],
		]);

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1
            class="title"
          >
            TITLE
          </h1>
          <div>
            DisplayNewRankings
          </div>
        </div>
      </div>
    `);
	});
});
