import { render } from '@jestConfig/render';
import { MatchOutcome } from '@components/MatchOutcome/MatchOutcome';
import { PlayerOutcomeProps } from '@components/PlayerOutcome/PlayerOutcome';
import { LOSES, WINS } from '@engine/simulation/simulate-match';

jest.mock('@components/PlayerOutcome/PlayerOutcome', () => ({
	PlayerOutcome: ({ name }: PlayerOutcomeProps) => (
		<div>
			PlayerOutcome:
			{name}
		</div>
	),
}));

describe('MatchOutcome', () => {
	it('should render for a singles match', () => {
		const playerA: PlayerOutcomeProps = {
			name: 'Player A',
			outcome: WINS,
			points: 1,
			ranking: 500,
		};
		const playerB: PlayerOutcomeProps = {
			name: 'Player B',
			outcome: LOSES,
			points: -1,
			ranking: 500,
		};
		const { container } = render(
			<MatchOutcome
				label="Singles"
				playerA={playerA}
				playerB={playerB}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="container"
      >
        <span>
          Singles
        </span>
        <div
          class="calculationContainer"
        >
          <div
            class="team"
          >
            <div>
              PlayerOutcome:
              Player A
            </div>
          </div>
          <div
            class="team"
          >
            <div>
              PlayerOutcome:
              Player B
            </div>
          </div>
        </div>
      </div>
    `);
	});

	it('should render for a doubles match', () => {
		const playerA: PlayerOutcomeProps = {
			name: 'Player A',
			outcome: WINS,
			points: 1,
			ranking: 500,
		};
		const playerB: PlayerOutcomeProps = {
			name: 'Player B',
			outcome: LOSES,
			points: -1,
			ranking: 500,
		};
		const playerC: PlayerOutcomeProps = {
			name: 'Player C',
			outcome: WINS,
			points: 1,
			ranking: 500,
		};
		const playerD: PlayerOutcomeProps = {
			name: 'Player D',
			outcome: LOSES,
			points: -1,
			ranking: 500,
		};
		const { container } = render(
			<MatchOutcome
				label="Doubles"
				playerA={playerA}
				playerB={playerB}
				playerC={playerC}
				playerD={playerD}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="container"
      >
        <span>
          Doubles
        </span>
        <div
          class="calculationContainer"
        >
          <div
            class="team"
          >
            <div>
              PlayerOutcome:
              Player A
            </div>
            <div>
              PlayerOutcome:
              Player C
            </div>
          </div>
          <div
            class="team"
          >
            <div>
              PlayerOutcome:
              Player B
            </div>
            <div>
              PlayerOutcome:
              Player D
            </div>
          </div>
        </div>
      </div>
    `);
	});
});
