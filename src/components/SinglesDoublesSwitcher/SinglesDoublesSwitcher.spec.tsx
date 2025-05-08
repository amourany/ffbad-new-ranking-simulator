import { SinglesDoublesSwitcher } from '@components/SinglesDoublesSwitcher/SinglesDoublesSwitcher';
import { render } from '@jestConfig/render';
import { userEvent } from '@testing-library/user-event';

describe('SinglesDoublesSwitcher', () => {
	it('should render in singles mode', () => {
		const { container } = render(
			<SinglesDoublesSwitcher
				doublesLabel={'To doubles'}
				isDoublesMatch={false}
				onChange={jest.fn()}
				singlesLabel={'To singles'}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="button"
      >
        <button
          aria-label=""
          data-testid="Button"
          type="button"
        >
          <div
            data-testid="mocked-icon-IconUsersPlus"
          />
          <div
            class="buttonLabel"
          >
            To doubles
          </div>
        </button>
      </div>
    `);
	});

	it('should render in doubles mode', () => {
		const { container } = render(
			<SinglesDoublesSwitcher
				doublesLabel={'To doubles'}
				isDoublesMatch={true}
				onChange={jest.fn()}
				singlesLabel={'To singles'}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="button"
      >
        <button
          aria-label=""
          data-testid="Button"
          type="button"
        >
          <div
            data-testid="mocked-icon-IconUsersMinus"
          />
          <div
            class="buttonLabel"
          >
            To singles
          </div>
        </button>
      </div>
    `);
	});

	it('should toggle on click', async () => {
		const toggle = jest.fn();

		const { getByRole } = render(
			<SinglesDoublesSwitcher
				doublesLabel={'To doubles'}
				isDoublesMatch={true}
				onChange={toggle}
				singlesLabel={'To singles'}
			/>,
		);

		await userEvent.click(getByRole('button'));

		expect(toggle).toHaveBeenCalled();
	});
});
