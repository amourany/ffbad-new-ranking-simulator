import { render } from '@jestConfig/render';
import { RankingSet } from '@components/RankingSet/RankingSet';
import { RankingTileProps } from '@components/RankingTile/RankingTile';

jest.mock('@components/RankingTile/RankingTile', () => ({
	RankingTile: ({ rankingRate, rankingSubLevel }: RankingTileProps) => (
		<div>
			RankingTile :
			{' '}
			{rankingSubLevel}
			{' '}
			-
			{rankingRate}
		</div>
	),
}));

describe('RankingSet', () => {
	it('should render', () => {
		const { container } = render(
			<RankingSet
				doubleRate={2000}
				doubleSubLevel="N2"
				mixedRate={2000}
				mixedSubLevel="N3"
				singleRate={2400}
				singleSubLevel="N1"
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="container large"
      >
        <div>
          RankingTile :
           
          N1
           
          -
          2400
        </div>
        <div>
          RankingTile :
           
          N2
           
          -
          2000
        </div>
        <div>
          RankingTile :
           
          N3
           
          -
          2000
        </div>
      </div>
    `);
	});
});
