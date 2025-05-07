import { InfoTooltip } from '@components/InfoTooltip/InfoTooltip';
import { render } from '@jestConfig/render';

describe('InfoTooltip', () => {
	it('should render', () => {
		const { container } = render(
			<InfoTooltip content={[
				'content 1',
				'content 2',
			]}
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        data-testid="Popover"
      >
        <div
          data-testid="PopoverTarget"
        >
          <div
            data-testid="mocked-icon-IconInfoCircleFilled"
          />
        </div>
        <div
          data-testid="PopoverDropdown"
        >
          <div>
            content 1
          </div>
          <div>
            content 2
          </div>
        </div>
      </div>
    `);
	});
});
