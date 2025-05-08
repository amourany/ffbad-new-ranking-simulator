import { render } from '@jestConfig/render';
import { PlayerOutcome } from '@components/PlayerOutcome/PlayerOutcome';
import { LOSES, WINS } from '@engine/simulation/simulate-match';

describe('PlayerOutcome', () => {
	describe('large variant', () => {
		it('should render when winning', () => {
			const { container } = render(
				<PlayerOutcome
					name="JohnDoe"
					outcome={WINS}
					points={12}
					ranking={500}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
              <div
                class="win player"
              >
                <div
                  class="name"
                >
                  NAME
                  <div
                    class="points"
                  >
                    POINTS_WINS
                  </div>
                </div>
                <div
                  class="calculationDetails"
                >
                  CALCULATION_DETAILS_WINS
                </div>
              </div>
          `);
		});

		it('should render when losing', () => {
			const { container } = render(
				<PlayerOutcome
					name="JohnDoe"
					outcome={LOSES}
					points={-12}
					ranking={500}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
              <div
                class="loss player"
              >
                <div
                  class="name"
                >
                  NAME
                  <div
                    class="points"
                  >
                    POINTS_LOSES
                  </div>
                </div>
                <div
                  class="calculationDetails"
                >
                  CALCULATION_DETAILS_LOSES
                </div>
              </div>
          `);
		});
	});

	describe('small variant', () => {
		it('should render when winning', () => {
			const { container } = render(
				<PlayerOutcome
					name="JohnDoe"
					outcome={WINS}
					points={12}
					ranking={500}
					variant={'small'}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="win player"
        >
          <div
            class="name"
          >
            NAME
            <div
              class="points"
            >
              POINTS_WINS
            </div>
          </div>
        </div>
      `);
		});

		it('should render when losing', () => {
			const { container } = render(
				<PlayerOutcome
					name="JohnDoe"
					outcome={LOSES}
					points={-12}
					ranking={500}
					variant={'small'}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div
          class="loss player"
        >
          <div
            class="name"
          >
            NAME
            <div
              class="points"
            >
              POINTS_LOSES
            </div>
          </div>
        </div>
      `);
		});
	});
});
