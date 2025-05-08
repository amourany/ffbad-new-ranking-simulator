import { render } from '@jestConfig/render';
import { MatchSimulation } from '@components/MatchSimulation/MatchSimulation';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';

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

jest.mock('@api/player-ranking/useFetchPlayerRankings', () => ({
	useFetchPlayerRankings: jest.fn(),
}));

jest.mock('@engine/simulation/resolve-rank-extractor', () => ({
	resolveExtractor: jest.fn(),
}));

describe('MatchSimulation', () => {
	describe('Singles', () => {
		it('should render', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: malePlayerInfo,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: false,
						isDoublesMatch: false,
						isMixedDoubles: false,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          SinglesMatchSimulation
        </div>
      `);
		});

		it('should not render while loading', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: undefined,
				isLoading: true,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: false,
						isDoublesMatch: false,
						isMixedDoubles: false,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot('HTMLCollection []');
		});
	});

	describe('Doubles', () => {
		it('should render for a classic doubles match', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: malePlayerInfo,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: false,
						isDoublesMatch: true,
						isMixedDoubles: false,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          DoublesMatchSimulation
        </div>
      `);
		});

		it('should render for a mixed doubles match', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: malePlayerInfo,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: false,
						isDoublesMatch: true,
						isMixedDoubles: true,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          DoublesMatchSimulation
        </div>
      `);
		});

		it('should render for a cross-gender doubles match', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: malePlayerInfo,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: true,
						isDoublesMatch: true,
						isMixedDoubles: true,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          DoublesMatchSimulation
        </div>
      `);
		});

		it('should not render while loading', () => {
			(useFetchPlayerRankings as jest.Mock).mockReturnValue({
				data: undefined,
				isLoading: true,
			});

			const { container } = render(
				<MatchSimulation
					matchConfiguration={{
						isCrossGenderMatch: false,
						isDoublesMatch: true,
						isMixedDoubles: false,
						matchMultiplyingFactor: 1,
					}}
					playerALicence={1}
					playerBLicence={2}
					playerCLicence={3}
					playerDLicence={4}
				/>,
			);

			expect(container).toMatchInlineSnapshot('HTMLCollection []');
		});
	});
});
