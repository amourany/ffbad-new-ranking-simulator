import { render } from "@jestConfig/render";
import { Team } from "@components/Team/Team";
import { PlayerInMatchProps } from "@components/PlayerInMatch/PlayerInMatch";

jest.mock("@components/PlayerInMatch/PlayerInMatch", () => ({
  PlayerInMatch: ({ label }: PlayerInMatchProps) => (
    <div>
      PlayerInMatch:
      {label}
    </div>
  ),
}));

describe("Team", () => {
  it("should render for a one player team", () => {
    const { container } = render(
      <Team
        isDoublesMatch={false}
        licenceA={1234}
        onPlayerAChange={jest.fn()}
        onPlayerAClear={jest.fn()}
        playerALabel="Player A"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div
        class="team"
      >
        <div>
          PlayerInMatch:
          Player A
        </div>
      </div>
    `);
  });

  it("should render for a two players team", () => {
    const { container } = render(
      <Team
        isDoublesMatch={true}
        licenceA={1234}
        licenceB={5678}
        onPlayerAChange={jest.fn()}
        onPlayerAClear={jest.fn()}
        onPlayerBChange={jest.fn()}
        onPlayerBClear={jest.fn()}
        playerALabel="Player A"
        playerBLabel="Player B"
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div
        class="team"
      >
        <div>
          PlayerInMatch:
          Player A
        </div>
        <div>
          PlayerInMatch:
          Player B
        </div>
      </div>
    `);
  });
});
