import { render } from '@jestConfig/render';
import { RankingTile } from '@components/RankingTile/RankingTile';
import {
	RANKING_SET_LARGE_VARIANT,
	RANKING_SET_SMALL_VARIANT,
} from '@components/RankingSet/RankingSet';

describe('RankingTile', () => {
	it('should render for large variant', () => {
		const { container } = render(
			<RankingTile
				discipline="Singles"
				rankingRate={500}
				rankingSubLevel="P11"
				variant={RANKING_SET_LARGE_VARIANT}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="tile large"
      >
        <label
          class="discipline"
        >
          Singles
        </label>
        <div
          class="subLevelContainer P11 large"
        >
          <div
            class="subLevel"
          >
            P11
          </div>
        </div>
        <div
          class="ranking large"
        >
          500
        </div>
      </div>
    `);
	});

	it('should render for small variant', () => {
		const { container } = render(
			<RankingTile
				rankingRate={500}
				rankingSubLevel="P11"
				variant={RANKING_SET_SMALL_VARIANT}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="tile small"
      >
        <div
          class="subLevelContainer P11 small"
        >
          <div
            class="subLevel"
          >
            P11
          </div>
          <div
            class="ranking small"
          >
            500
          </div>
        </div>
      </div>
    `);
	});
});
