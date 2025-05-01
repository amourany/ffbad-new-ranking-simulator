import { createTheme, em } from '@mantine/core';

export const theme = createTheme({
	breakpoints: {
		lg: em('1200'),
		md: em('900'),
		sm: em('600'),
		xl: em('1800'),
		xs: em('360'),
	},
});
