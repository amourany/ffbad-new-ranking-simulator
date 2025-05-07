import { render } from '@jestConfig/render';
import { SubTitle } from '@components/SubTitle/SubTitle';
import { TooltipProps } from '@mantine/core';

jest.mock('@components/InfoTooltip/InfoTooltip', () => ({
	InfoTooltip: ({ content }: TooltipProps) => <div>{content}</div>,
}));

describe('SubTitle', () => {
	it('should render without tooltip', () => {
		const { container } = render(<SubTitle label="title" />);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="titleContainer"
      >
        <h2
          class="title"
        >
          title
        </h2>
      </div>
    `);
	});

	it('should render with a tooltip', () => {
		const { container } = render(
			<SubTitle
				label="title"
				tooltipContent={[
					'content 1',
					'content 2',
				]}
				withTooltip
			/>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="titleContainer"
      >
        <h2
          class="title"
        >
          title
        </h2>
        <div>
          content 1
          content 2
        </div>
      </div>
    `);
	});
});
