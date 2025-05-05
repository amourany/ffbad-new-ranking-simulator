// ./test-utils/render.tsx
import { getByTestId, render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const render = (ui: React.ReactNode) => {

	const wrapper = ({ children }: PropsWithChildren) => (
		<MantineProvider>
			<div data-testid="test-container">{children}</div>
		</MantineProvider>
	);


	const rendered = testingLibraryRender(<>{ui}</>, { wrapper });
	const container = getByTestId(rendered.container, 'test-container').children.length === 1 ?
		getByTestId(rendered.container, 'test-container').children[0] :
		getByTestId(rendered.container, 'test-container').children;
	return {
		...rendered,
		container,
	};
};
