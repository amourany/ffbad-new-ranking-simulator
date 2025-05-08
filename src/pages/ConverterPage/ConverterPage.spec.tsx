import { ConverterPage } from './ConverterPage';
import { render } from '@jestConfig/render';
import { useFetchPlayerRankings } from '@api/player-ranking/useFetchPlayerRankings';
import { malePlayerInfo } from '@jestConfig/__mocks__/playerInfoMock';
import { TitleProps } from '@components/Title/Title';

jest.mock('@api/player-ranking/useFetchPlayerRankings', () => ({
	useFetchPlayerRankings: jest.fn(),
}));

jest.mock('@components/DisplayNewRankings/DisplayNewRankings', () => ({
	DisplayNewRankings: () => <div>DisplayNewRankings</div>,
}));

jest.mock('@components/SearchPlayerInput/SearchPlayerInput', () => ({
	SearchPlayerInput: () => <div>SearchPlayerInput</div>,
}));

jest.mock('@components/Title/Title', () => ({
	Title: ({ label }: TitleProps) => <h1>{label}</h1>,
}));

describe('ConverterPage', () => {
	it('should render with input untouched', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({ data: undefined });

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1>
            TITLE
          </h1>
          <div>
            SearchPlayerInput
          </div>
        </div>
      </div>
    `);
	});

	it('should render when loading player information', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({ data: undefined,
			isLoading:true });

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1>
            TITLE
          </h1>
          <div>
            SearchPlayerInput
          </div>
          <div>
            LOADING
          </div>
        </div>
      </div>
    `);
	});

	it('should render with player information', () => {
		(useFetchPlayerRankings as jest.Mock).mockReturnValue({ data: malePlayerInfo,
			isLoading:false });

		const { container } = render(<ConverterPage />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="Stack"
        >
          <h1>
            TITLE
          </h1>
          <div>
            DisplayNewRankings
          </div>
        </div>
      </div>
    `);
	});
});
