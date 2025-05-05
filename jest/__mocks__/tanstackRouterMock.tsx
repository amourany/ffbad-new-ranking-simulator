import { ToSubOptions } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';

jest.mock('@tanstack/react-router', () => ({
	Link: ({ to, children }: ToSubOptions & PropsWithChildren) => <a href={to}>{children}</a>,
	useMatchRoute: () => jest.fn(),
	useNavigate: () => jest.fn(),
}));
