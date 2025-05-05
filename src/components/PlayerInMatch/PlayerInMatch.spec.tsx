import { render } from '@jestConfig/render';
import { PlayerInMatch } from '@components/PlayerInMatch/PlayerInMatch';
import { SearchPlayerInputProps } from '@components/SearchPlayerInput/SearchPlayerInput';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';

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

describe('PlayerInMatch', () => {
	it('should render when no player is selected', () => {
		const { container } = render(
			<PlayerInMatch
				isLoading={false}
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
				playerInfo={undefined}
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
		const { container } = render(
			<PlayerInMatch
				isLoading={false}
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
				playerInfo={malePlayerInfo}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        PlayerRankings
      </div>
    `);
	});

	it('should render while loading', () => {
		const { container } = render(
			<PlayerInMatch
				isLoading={true}
				label="Player A"
				onChange={jest.fn()}
				onClear={jest.fn()}
				playerInfo={undefined}
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
});
