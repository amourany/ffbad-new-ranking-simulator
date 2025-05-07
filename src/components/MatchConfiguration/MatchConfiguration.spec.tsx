import { render } from '@jestConfig/render';
import { MatchConfiguration } from '@components/MatchConfiguration/MatchConfiguration';
import { TitleProps } from '@components/Title/Title';

jest.mock(
	'@components/MatchConfiguration/TournamentTypeSelect/TournamentTypeSelect',
	() => ({
		TournamentTypeSelect: () => <div>TournamentTypeSelect</div>,
	}),
);

jest.mock(
	'@components/MatchConfiguration/CrossGenderMatchSelect/CrossGenderMatchSelect',
	() => ({
		CrossGenderMatchSelect: () => <div>CrossGenderMatchSelect</div>,
	}),
);

jest.mock('@components/SubTitle/SubTitle', () => ({
	SubTitle: ({ label }: TitleProps) => <h2>{label}</h2>,
}));

describe('MatchConfiguration', () => {
	it('should render for a match', () => {
		const { container } = render(
			<MatchConfiguration
				isMixedDoublesMatch={false}
				onMatchTypeChange={jest.fn()}
				onTournamentTypeChange={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          TITLE
        </h2>
        <div
          class="inputs"
        >
          <div>
            TournamentTypeSelect
          </div>
        </div>
      </div>
    `);
	});

	it('should render for a mixed doubles match', () => {
		const { container } = render(
			<MatchConfiguration
				isMixedDoublesMatch={true}
				onMatchTypeChange={jest.fn()}
				onTournamentTypeChange={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          TITLE
        </h2>
        <div
          class="inputs"
        >
          <div>
            TournamentTypeSelect
          </div>
          <div>
            CrossGenderMatchSelect
          </div>
        </div>
      </div>
    `);
	});
});
