import { DisplayWinProbabilities } from '@components/DisplayWinProbabilities/DisplayWinProbabilities';
import { render } from '@jestConfig/render';

describe('DisplayWinProbabilities', () => {
	it('should render small variation', () => {
		const { container } = render(
			<DisplayWinProbabilities probabilities={20} />,
		);

		expect(container).toMatchInlineSnapshot(`
      <span
        class="label"
      >
        SHORT_LABEL
      </span>
    `);
	});

	it('should render large variation', () => {
		const { container } = render(
			<DisplayWinProbabilities
				probabilities={20}
				variant='large'
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <span
        class="label"
      >
        LABEL
      </span>
    `);
	});
});
