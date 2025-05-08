import { render } from '@jestConfig/render';
import { MatchSimulatorPage } from '@pages/MatchSimulatorPage/MatchSimulatorPage';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { Route } from '@routes/simulate';
import { PlayerInMatchProps } from '@components/PlayerInMatch/PlayerInMatch';
import {
	femalePlayerInfo,
	malePlayerInfo,
} from '@jestConfig/__mocks__/playerInfoMock';
import { act } from '@testing-library/react';
import { TitleProps } from '@components/Title/Title';
import { TeamProps } from '@components/Team/Team';

jest.mock('@components/PlayerInMatch/PlayerInMatch', () => ({
	PlayerInMatch: ({ label }: PlayerInMatchProps) => (
		<div>
			PlayerInMatch:
			{label}
		</div>
	),
}));

jest.mock('@api/player-ranking/useFetchPlayerRankings', () => ({
	useFetchPlayerRankings: jest.fn(),
}));

jest.mock(
	'@components/MatchSimulation/SinglesMatchSimulation/SinglesMatchSimulation',
	() => ({
		SinglesMatchSimulation: () => <div>SinglesMatchSimulation</div>,
	}),
);

jest.mock(
	'@components/MatchSimulation/DoublesMatchSimulation/DoublesMatchSimulation',
	() => ({
		DoublesMatchSimulation: () => <div>DoublesMatchSimulation</div>,
	}),
);

jest.mock('@components/MatchConfiguration/MatchConfiguration', () => ({
	MatchConfiguration: () => <div>MatchConfiguration</div>,
}));

jest.mock('@components/Title/Title', () => ({
	Title: ({ label }: TitleProps) => <h1>{label}</h1>,
}));

jest.mock('@components/Team/Team', () => ({
	Team: ({ playerALabel, playerBLabel, isDoublesMatch }: TeamProps) => (
		<div>
			{isDoublesMatch ? `${playerALabel} ${playerBLabel}` : `${playerALabel}`}
		</div>
	),
}));

jest.mock('@routes/simulate', () => ({
	Route: { fullPath: '/simulate',
		useSearch: jest.fn() },
}));

describe('MatchSimulatorPage', () => {
	describe('Singles', () => {
		it('should render untouched', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: undefined,
				playerB: undefined,
			});

			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: undefined,
			});

			const { container } = render(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              SINGLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersPlus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_DOUBLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
        </div>
      `);
		});

		it('should render with both players set', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: undefined,
				playerB: undefined,
			});

			(useFetchPlayerRankings as jest.Mock)
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValue({ data: undefined });

			const { container } = render(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              SINGLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersPlus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_DOUBLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
          <div>
            SinglesMatchSimulation
          </div>
        </div>
      `);
		});

		it('should automatically fill players from search params', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: 'licenceA',
				playerB: 'licenceB',
			});

			(useFetchPlayerRankings as jest.Mock)
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValue({ data: undefined });

			render(<MatchSimulatorPage />);

			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceA');
			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceB');
		});

		it('should switch to doubles view on switch click', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: 'licenceA',
				playerB: 'licenceB',
			});

			(useFetchPlayerRankings as jest.Mock)
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValue({ data: undefined });

			const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

			act(() => getByRole('button').click());
			rerender(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              DOUBLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersMinus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_SINGLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A PLAYER_C
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B PLAYER_D
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
        </div>
      `);
		});
	});

	describe('Doubles', () => {
		it('should render untouched', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: undefined,
				playerB: undefined,
			});

			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: undefined,
			});

			const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

			act(() => getByRole('button').click());
			rerender(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              DOUBLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersMinus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_SINGLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A PLAYER_C
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B PLAYER_D
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
        </div>
      `);
		});

		it('should render with both teams set', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: undefined,
				playerB: undefined,
			});

			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: malePlayerInfo,
			});

			const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

			act(() => getByRole('button').click());
			rerender(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              DOUBLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersMinus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_SINGLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A PLAYER_C
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B PLAYER_D
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
          <div>
            DoublesMatchSimulation
          </div>
        </div>
      `);
		});

		it('should automatically fill players from search params', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: 'licenceA',
				playerB: 'licenceB',
				playerC: 'licenceC',
				playerD: 'licenceD',
			});

			(useFetchPlayerRankings as jest.Mock)
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo });

			render(<MatchSimulatorPage />);

			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceA');
			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceB');
			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceC');
			expect(useFetchPlayerRankings).toHaveBeenCalledWith('licenceD');
		});

		it('should switch to singles view on switch click', () => {
			(Route.useSearch as jest.Mock).mockReturnValue({
				playerA: 'licenceA',
				playerB: 'licenceB',
				playerC: 'licenceC',
				playerD: 'licenceD',
			});

			(useFetchPlayerRankings as jest.Mock)
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValueOnce({ data: malePlayerInfo })
				.mockReturnValueOnce({ data: femalePlayerInfo })
				.mockReturnValue({ data: malePlayerInfo });

			const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

			act(() => getByRole('button').click());
			rerender(<MatchSimulatorPage />);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1>
              SINGLES_TITLE
            </h1>
            <div
              class="button"
            >
              <button
                aria-label=""
                data-testid="Button"
                type="button"
              >
                <div
                  data-testid="mocked-icon-IconUsersPlus"
                />
                <div
                  class="buttonLabel"
                >
                  SIMULATE_DOUBLES_MATCH
                </div>
              </button>
            </div>
          </div>
          <div
            class="playerInputsContainer"
          >
            <div>
              PLAYER_A
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div>
              PLAYER_B
            </div>
          </div>
          <div
            class="configuration"
          >
            <div>
              MatchConfiguration
            </div>
          </div>
          <div>
            SinglesMatchSimulation
          </div>
        </div>
      `);
		});
	});
});
