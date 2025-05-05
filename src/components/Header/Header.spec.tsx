import { render } from '@jestConfig/render';
import { Header } from '@components/Header/Header';

jest.mock('@components/LanguageSwitcher/LanguageSwitcher', () => ({
	LanguageSwitcher: () => <div>LanguageSwitcher</div>,
}));

describe('Header', () => {
	it('should render', () => {
		const { container } = render(<Header />);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="header"
      >
        <div
          class="title"
        >
          <svg
            class="logo"
          />
          <label>
            TITLE
          </label>
        </div>
        <div
          class="icons"
        >
          <button
            aria-label="Github"
            data-testid="ActionIcon"
            type="button"
          >
            <div
              data-testid="mocked-icon-IconBrandGithub"
            />
          </button>
          <div>
            LanguageSwitcher
          </div>
        </div>
      </div>
    `);
	});
});
