import { render } from '@jestConfig/render';
import { TournamentTypeSelect } from '@components/MatchConfiguration/TournamentTypeSelect/TournamentTypeSelect';
import { userEvent } from '@testing-library/user-event';

describe('TournamentTypeSelect', () => {
	it('should render', () => {
		const { container } = render(<TournamentTypeSelect onChange={jest.fn()}/>);

		expect(container).toMatchInlineSnapshot(`
      <input
        data-testid="Select"
        role="input"
      />
    `);
	});

	it('should call onChange function on change', async () => {
		const onChange = jest.fn();
		const { getByRole } = render(<TournamentTypeSelect onChange={onChange} />);

		await userEvent.type(getByRole('input'), 'value');
		expect(onChange).toHaveBeenCalled();
	});
});
