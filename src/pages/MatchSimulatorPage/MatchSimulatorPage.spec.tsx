import { render } from "@jestConfig/render";
import { MatchSimulatorPage } from "@pages/MatchSimulatorPage/MatchSimulatorPage";
import { useFetchPlayersRankings } from "@api/player-ranking/useFetchPlayersRankings";
import { Route } from "@routes/simulate";
import { PlayerInMatchProps } from "@components/PlayerInMatch/PlayerInMatch";
import {
  femalePlayerInfo,
  malePlayerInfo,
} from "@jestConfig/__mocks__/playerInfoMock";
import { act } from "@testing-library/react";

jest.mock("@components/PlayerInMatch/PlayerInMatch", () => ({
  PlayerInMatch: ({ label }: PlayerInMatchProps) => (
    <div>
      PlayerInMatch:
      {label}
    </div>
  ),
}));

jest.mock("@api/player-ranking/useFetchPlayersRankings", () => ({
  useFetchPlayersRankings: jest.fn(),
}));

jest.mock("@components/SinglesMatchSimulation/SinglesMatchSimulation", () => ({
  SinglesMatchSimulation: () => <div>SinglesMatchSimulation</div>,
}));

jest.mock("@components/DoublesMatchSimulation/DoublesMatchSimulation", () => ({
  DoublesMatchSimulation: () => <div>DoublesMatchSimulation</div>,
}));

jest.mock("@routes/simulate", () => ({
  Route: { fullPath: "/simulate", useSearch: jest.fn() },
}));

describe("MatchSimulatorPage", () => {
  describe("Singles", () => {
    it("should render untouched", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: undefined,
        playerB: undefined,
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: undefined }],
        ["playerB", { data: undefined }],
        ["playerC", { data: undefined }],
        ["playerD", { data: undefined }],
      ]);

      const { container } = render(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
            </div>
          </div>
        </div>
      `);
    });

    it("should render with both players set", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: undefined,
        playerB: undefined,
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: undefined }],
        ["playerD", { data: undefined }],
      ]);

      const { container } = render(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
            </div>
          </div>
          <div>
            SinglesMatchSimulation
          </div>
        </div>
      `);
    });

    it("should automatically fill players from search params", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: "licenceA",
        playerB: "licenceB",
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: undefined }],
        ["playerD", { data: undefined }],
      ]);

      render(<MatchSimulatorPage />);

      expect(useFetchPlayersRankings).toHaveBeenCalledWith({
        playerA: "licenceA",
        playerB: "licenceB",
      });
    });

    it("should switch to doubles view on switch click", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: "licenceA",
        playerB: "licenceB",
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: undefined }],
        ["playerD", { data: undefined }],
      ]);

      const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

      act(() => getByRole("button").click());
      rerender(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
              <span>
                DOUBLES_TITLE
              </span>
              <div
                data-testid="Popover"
              >
                <div
                  data-testid="PopoverTarget"
                >
                  <div
                    data-testid="mocked-icon-IconInfoCircleFilled"
                  />
                </div>
                <div
                  data-testid="PopoverDropdown"
                >
                  <div>
                    DOUBLES_TOOLTIP_1
                  </div>
                  <div>
                    DOUBLES_TOOLTIP_2
                  </div>
                </div>
              </div>
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
              <div>
                PlayerInMatch:
                PLAYER_C
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
              <div>
                PlayerInMatch:
                PLAYER_D
              </div>
            </div>
          </div>
        </div>
      `);
    });
  });

  describe("Doubles", () => {
    it("should render untouched", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: undefined,
        playerB: undefined,
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: undefined }],
        ["playerB", { data: undefined }],
        ["playerC", { data: undefined }],
        ["playerD", { data: undefined }],
      ]);

      const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

      act(() => getByRole("button").click());
      rerender(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
              <span>
                DOUBLES_TITLE
              </span>
              <div
                data-testid="Popover"
              >
                <div
                  data-testid="PopoverTarget"
                >
                  <div
                    data-testid="mocked-icon-IconInfoCircleFilled"
                  />
                </div>
                <div
                  data-testid="PopoverDropdown"
                >
                  <div>
                    DOUBLES_TOOLTIP_1
                  </div>
                  <div>
                    DOUBLES_TOOLTIP_2
                  </div>
                </div>
              </div>
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
              <div>
                PlayerInMatch:
                PLAYER_C
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
              <div>
                PlayerInMatch:
                PLAYER_D
              </div>
            </div>
          </div>
        </div>
      `);
    });

    it("should render with both teams set", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: undefined,
        playerB: undefined,
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: malePlayerInfo }],
        ["playerD", { data: femalePlayerInfo }],
      ]);

      const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

      act(() => getByRole("button").click());
      rerender(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
              <span>
                DOUBLES_TITLE
              </span>
              <div
                data-testid="Popover"
              >
                <div
                  data-testid="PopoverTarget"
                >
                  <div
                    data-testid="mocked-icon-IconInfoCircleFilled"
                  />
                </div>
                <div
                  data-testid="PopoverDropdown"
                >
                  <div>
                    DOUBLES_TOOLTIP_1
                  </div>
                  <div>
                    DOUBLES_TOOLTIP_2
                  </div>
                </div>
              </div>
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
              <div>
                PlayerInMatch:
                PLAYER_C
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
              <div>
                PlayerInMatch:
                PLAYER_D
              </div>
            </div>
          </div>
          <div>
            DoublesMatchSimulation
          </div>
        </div>
      `);
    });

    it("should automatically fill players from search params", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: "licenceA",
        playerB: "licenceB",
        playerC: "licenceC",
        playerD: "licenceD",
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: malePlayerInfo }],
        ["playerD", { data: femalePlayerInfo }],
      ]);

      render(<MatchSimulatorPage />);

      expect(useFetchPlayersRankings).toHaveBeenCalledWith({
        playerA: "licenceA",
        playerB: "licenceB",
        playerC: "licenceC",
        playerD: "licenceD",
      });
    });

    it("should switch to singles view on switch click", () => {
      (Route.useSearch as jest.Mock).mockReturnValue({
        playerA: "licenceA",
        playerB: "licenceB",
        playerC: "licenceC",
        playerD: "licenceD",
      });

      (useFetchPlayersRankings as jest.Mock).mockReturnValue([
        ["playerA", { data: malePlayerInfo }],
        ["playerB", { data: femalePlayerInfo }],
        ["playerC", { data: malePlayerInfo }],
        ["playerD", { data: femalePlayerInfo }],
      ]);

      const { container, getByRole, rerender } = render(<MatchSimulatorPage />);

      act(() => getByRole("button").click());
      rerender(<MatchSimulatorPage />);

      expect(container).toMatchInlineSnapshot(`
        <div
          class="container"
        >
          <div
            class="titleRow"
          >
            <h1
              class="title"
            >
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
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_A
              </div>
            </div>
            <div
              class="versus"
            >
              VS
            </div>
            <div
              class="team"
            >
              <div>
                PlayerInMatch:
                PLAYER_B
              </div>
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
