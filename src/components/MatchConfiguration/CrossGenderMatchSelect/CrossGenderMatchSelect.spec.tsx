import { CrossGenderMatchSelect } from '@components/MatchConfiguration/CrossGenderMatchSelect/CrossGenderMatchSelect';
import { render } from '@jestConfig/render';
import { userEvent } from '@testing-library/user-event';

describe('CrossGenderMatchSelect', () => {
	it('should render', () => {
		const { container } = render(
			<CrossGenderMatchSelect onChange={jest.fn()} />,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="container"
      >
        <div
          data-testid="InputWrapper"
        >
          <div>
            <button>
              MIXED_DOUBLE
            </button>
          </div>
          <div>
            <button>
              CROSS_GENDER_DOUBLE
            </button>
          </div>
        </div>
      </div>
    `);
	});

	it('should call on change when selecting a new value', async () => {
		const onChange = jest.fn();
		const { getAllByRole } = render(
			<CrossGenderMatchSelect onChange={onChange} />,
		);

		const buttons = getAllByRole('button');
		await userEvent.click(buttons[0]);
		expect(onChange).toHaveBeenCalled();
		expect(buttons.length).toBe(2);
	});
});
