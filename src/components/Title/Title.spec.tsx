import { render } from '@jestConfig/render';
import { TooltipProps } from '@mantine/core';
import { Title } from '@components/Title/Title';

jest.mock('@components/InfoTooltip/InfoTooltip', () => ({
	InfoTooltip: ({ content }: TooltipProps) => <div>{content}</div>,
}));

describe('Title', () => {
	it('should render without tooltip', () => {
		const { container } = render(<Title label="title" />);

		expect(container).toMatchInlineSnapshot(`
      <div
        class="titleContainer"
      >
        <h1
          class="title"
        >
          title
        </h1>
      </div>
    `);
	});

	it('should render with a tooltip', () => {
		const { container } = render(
			<Title
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
        <h1
          class="title"
        >
          title
        </h1>
        <div>
          content 1
          content 2
        </div>
      </div>
    `);
	});
});
