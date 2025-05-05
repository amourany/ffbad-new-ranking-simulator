import { SearchPlayerInput } from '@components/SearchPlayerInput/SearchPlayerInput';
import { render } from '@jestConfig/render';
import { useSearchPlayer } from '@api/search-player/useSearchPlayer';

jest.mock('@api/search-player/useSearchPlayer', () => ({
	useSearchPlayer: jest.fn(),
}));

describe('SearchPlayerInput', () => {
	it('should render when untouched', () => {
		(useSearchPlayer as jest.Mock).mockReturnValue({ data: undefined });

		const { container } = render(
			<SearchPlayerInput
				label="Player"
				onChange={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Combobox"
      >
        <div
          data-testid="Combobox.Target"
        >
          <input
            data-testid="TextInput"
            placeholder="PLACEHOLDER"
            role="input"
            value=""
          />
        </div>
        <div
          data-testid="Combobox.Dropdown"
        >
          <div
            data-testid="Combobox.Options"
          />
        </div>
      </div>
    `);
	});

	it('should render when loading options', () => {
		(useSearchPlayer as jest.Mock).mockReturnValue({
			data: undefined,
			isFetching: true,
		});

		const { container } = render(
			<SearchPlayerInput
				label="Player"
				onChange={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Combobox"
      >
        <div
          data-testid="Combobox.Target"
        >
          <input
            data-testid="TextInput"
            placeholder="PLACEHOLDER"
            role="input"
            value=""
          />
        </div>
        <div
          data-testid="Combobox.Dropdown"
        >
          <div
            data-testid="Combobox.Options"
          >
            <div
              data-testid="Combobox.Empty"
            >
              LOADING
            </div>
          </div>
        </div>
      </div>
    `);
	});

	it('should render with options loaded', () => {
		(useSearchPlayer as jest.Mock).mockReturnValue({
			data: [
				{
					club: { acronym: 'ABC' },
					licence: '123',
					name: 'John Doe',
					personId: '123',
				},
				{
					club: { acronym: 'ABC' },
					licence: '456',
					name: 'Jane Doe',
					personId: '456',
				},
			],
			isFetching: false,
		});

		const { container } = render(
			<SearchPlayerInput
				label="Player"
				onChange={jest.fn()}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Combobox"
      >
        <div
          data-testid="Combobox.Target"
        >
          <input
            data-testid="TextInput"
            placeholder="PLACEHOLDER"
            role="input"
            value=""
          />
        </div>
        <div
          data-testid="Combobox.Dropdown"
        >
          <div
            data-testid="Combobox.Options"
          >
            <option
              data-testid="Option"
            >
              John Doe
               - 
              ABC
            </option>
            <option
              data-testid="Option"
            >
              Jane Doe
               - 
              ABC
            </option>
            <div />
          </div>
        </div>
      </div>
    `);
	});
});
