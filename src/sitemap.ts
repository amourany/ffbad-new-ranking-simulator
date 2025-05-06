import { Sitemap } from 'tanstack-router-sitemap';
import { FileRouteTypes } from 'routeTree.gen';

export type TRoutes = FileRouteTypes['fullPaths'];

export const sitemap: Sitemap<TRoutes> = {
	defaultPriority: 0.5,
	routes: {
		'/':{
			changeFrequency: 'daily',
			priority: 1,
		},
		'/convert': {
			changeFrequency: 'daily',
			priority: 1,
		},
		'/simulate': {
			changeFrequency: 'daily',
			priority: 1,
		},
	},
	siteUrl: 'https://amourany.github.io/ffbad-new-ranking-simulator',
};
