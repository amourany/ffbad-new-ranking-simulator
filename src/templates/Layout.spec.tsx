import { Layout } from '@templates/Layout';
import { render } from '@jestConfig/render';

jest.mock('@components/Header/Header', () => ({
	Header: () => <div>Header</div>,
}));

jest.mock('@components/RankingExplanation/RankingExplanation', () => ({
	RankingExplanation: () => <div>RankingExplanation</div>,
}));

jest.mock('@routes/simulate', () => ({
	Route: { to: '/simulate' },
}));

jest.mock('@routes/convert', () => ({
	Route: { to: '/convert' },
}));

describe('Layout', () => {
	it('should render', () => {
		const { container } = render(<Layout />);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="AppShell"
      >
        <div
          data-testid="AppShellHeader"
        >
          <div>
            Header
          </div>
        </div>
        <div
          data-testid="AppShellMain"
        >
          <div
            data-testid="Tabs"
          >
            <div
              data-testid="Tabs.List"
            >
              <div
                data-testid="Tabs.Tab"
              >
                <a
                  href="/simulate"
                >
                  <div
                    data-testid="mocked-icon-IconVs"
                  />
                  SIMULATE
                </a>
              </div>
              <div
                data-testid="Tabs.Tab"
              >
                <a
                  href="/convert"
                >
                  <div
                    data-testid="mocked-icon-IconTransform"
                  />
                   
                  CONVERT
                </a>
              </div>
            </div>
            <div
              data-testid="Tabs.Panel"
            >
              <div
                class="content"
              >
                <div>
                  RankingExplanation
                </div>
              </div>
            </div>
            <div
              data-testid="Tabs.Panel"
            >
              <div
                class="content"
              >
                <div>
                  RankingExplanation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
	});
});
