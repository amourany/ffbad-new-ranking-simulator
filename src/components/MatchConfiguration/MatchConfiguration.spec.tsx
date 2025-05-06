import { render } from '@jestConfig/render';
import { MatchConfiguration } from '@components/MatchConfiguration/MatchConfiguration';

describe('MatchConfiguration', () => {
	it('should render', () => {
		const { container } = render(<MatchConfiguration onChange={jest.fn()} />);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          TITLE
        </h2>
        <input
          data-testid="Select"
          role="input"
        />
      </div>
    `);
	});
});
