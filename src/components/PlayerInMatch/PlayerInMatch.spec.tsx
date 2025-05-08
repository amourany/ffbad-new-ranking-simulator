import { render } from '@jestConfig/render';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { SearchPlayerInputProps } from '@components/SearchPlayerInput/SearchPlayerInput';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';

jest.mock('@components/SearchPlayerInput/SearchPlayerInput', () => ({
	SearchPlayerInput: ({ label }: SearchPlayerInputProps) => (
		<div>
			SearchPlayerInput :
			{label}
		</div>
	),
}));

jest.mock('@components/DisplayPlayerRankings/DisplayPlayerRankings', () => ({
	DisplayPlayerRankings: () => <div>PlayerRankings</div>,
}));

jest.mock('@api/player-ranking/useFetchPlayerRankings', () => ({
	useFetchPlayerRankings: jest.fn(),
}));

describe('PlayerInMatch', () => {
	it('should render when no player is selected', () => {
		(useFetchPlayerRankings as jest.Mock).mockResolvedValue({
			data: undefined,
			isLoading: false,
		});

		const { container } = render(
			<PlayerInMatch
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="searchPlayer"
      >
        <div>
          SearchPlayerInput :
          Player A
        </div>
      </div>
    `);
	});

	it('should render when a player is selected', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({
			data: malePlayerInfo,
			isLoading: false,
		});
		const { container } = render(
			<PlayerInMatch
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        PlayerRankings
      </div>
    `);
	});

	it('should render while loading', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({
			data: undefined,
			isLoading: true,
		});
		const { container } = render(
			<PlayerInMatch
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      HTMLCollection [
        <div
          class="searchPlayer"
        >
          <div>
            SearchPlayerInput :
            Player A
          </div>
        </div>,
        <div>
          LOADING
        </div>,
      ]
    `);
	});

	it('should render with default licence', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({
			data: malePlayerInfo,
			isLoading: false,
		});
		render(
			<PlayerInMatch
				label="Player A"
				licence={1234}
				onChange={jest.fn()}
				onClear={jest.fn()}
			/>,
		);

		expect(useFetchPlayerRankings).toHaveBeenCalledWith(1234);
	});
});
