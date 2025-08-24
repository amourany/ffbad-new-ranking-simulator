import { Layout } from '@templates/Layout';
import { render } from '@jestConfig/render';
import { useMediaQuery } from '@mantine/hooks';
import { useRouterState } from '@tanstack/react-router';

jest.mock('@components/Header/Header', () => ({
	Header: () => <div>Header</div>,
}));

jest.mock('@components/RankingExplanation/RankingExplanation', () => ({
	RankingExplanation: () => <div>RankingExplanation</div>,
}));

jest.mock('@routes/simulate', () => ({
	Route: { to: '/simulate' },
}));

jest.mock('@routes/simulate-tournament', () => ({
	Route: { to: '/simulate-tournament' },
}));
jest.mock('@routes/club-podiums', () => ({
	Route: { to: '/club-podiums' },
}));

jest.mock('@mantine/hooks', () => ({
	useMediaQuery: jest.fn(),
}));

describe('Layout', () => {
	it('should render in desktop view', () => {
		(useRouterState as jest.Mock).mockReturnValue({ pathname: '/simulate' });
		(useMediaQuery as jest.Mock).mockReturnValue(true);

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
                  href="/simulate-tournament"
                >
                  <div
                    data-testid="mocked-icon-IconTournament"
                  />
                  SIMULATE_TOURNAMENT
                </a>
              </div>
              <div
                data-testid="Tabs.Tab"
              >
                <a
                  href="/club-podiums"
                >
                  <div
                    data-testid="mocked-icon-IconTrophy"
                  />
                  CLUB_PODIUMS
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
            <div
              data-testid="Tabs.Panel"
            >
              <div
                class="content"
              />
            </div>
          </div>
        </div>
      </div>
    `);
	});

	it('should render in mobile view', () => {
		(useRouterState as jest.Mock).mockReturnValue({ pathname: '/simulate' });
		(useMediaQuery as jest.Mock).mockReturnValue(false);
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
            class="content"
          >
            <div>
              RankingExplanation
            </div>
          </div>
        </div>
        <div
          data-testid="AppShellFooter"
        >
          <a
            href="/simulate"
          >
            <div
              class="footerEntry"
            >
              <div
                data-testid="mocked-icon-IconVs"
              />
              MOBILE_SIMULATE
            </div>
          </a>
          <a
            href="/simulate-tournament"
          >
            <div
              class="footerEntry"
            >
              <div
                data-testid="mocked-icon-IconTournament"
              />
              MOBILE_SIMULATE_TOURNAMENT
            </div>
          </a>
          <a
            href="/club-podiums"
          >
            <div
              class="footerEntry"
            >
              <div
                data-testid="mocked-icon-IconTrophy"
              />
              MOBILE_CLUB_PODIUMS
            </div>
          </a>
        </div>
      </div>
    `);
	});
});
