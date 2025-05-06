import './App.css';
import './i18n';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '@hooks/useTranslation';

const hashHistory = createHashHistory();
const router = createRouter({
	basepath:'/',
	history: hashHistory,
	routeTree,
});

window.addEventListener('vite:preloadError', () => {
	window.location.reload();
});

const App = () => {
	const { t } = useTranslation({ keyPrefix: 'APP' });

	return <>
		<Helmet>
			<title>{t('TITLE')}</title>
			<meta
				content="50zOKje2qP4OfQVSF_s706oMrgIUU7v5rnIv0oE7snE"
				name="google-site-verification"
			/>
			<meta
				content={t('DESCRIPTION_CONTENT')}
				name="description"
			/>
			<meta
				content={t('TITLE')}
				name="og:title"
			/>
			<meta
				content={t('DESCRIPTION_CONTENT')}
				name="og:description"
			/>
		</Helmet>
		<RouterProvider router={router}/>
	</>;
};

export default App;
