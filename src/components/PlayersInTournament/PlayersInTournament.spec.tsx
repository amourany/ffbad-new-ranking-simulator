import { render } from '@jestConfig/render';
import { PlayersInTournament } from '@components/PlayersInTournament/PlayersInTournament';

describe('PlayersInTournament', () => {
	it('should display player count', () => {
		const { container } = render(
			<PlayersInTournament
				playerCount={10}
				playerNames={[]}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Popover"
      >
        <div
          data-testid="PopoverTarget"
        >
          <div
            class="icon"
          >
            <div
              data-testid="mocked-icon-IconUsers"
            />
            10
          </div>
        </div>
        <div
          data-testid="PopoverDropdown"
        />
      </div>
    `);
	});

	it('should display player names', () => {
		const { container } = render(
			<PlayersInTournament
				playerCount={2}
				playerNames={[
					'John',
					'Jane',
				]}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Popover"
      >
        <div
          data-testid="PopoverTarget"
        >
          <div
            class="icon"
          >
            <div
              data-testid="mocked-icon-IconUsers"
            />
            2
          </div>
        </div>
        <div
          data-testid="PopoverDropdown"
        >
          <div>
            John
          </div>
          <div>
            Jane
          </div>
        </div>
      </div>
    `);
	});
});
