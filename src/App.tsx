import './App.css';
import './i18n';
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const hashHistory = createHashHistory();
const router = createRouter({
	basepath:'/',
	history: hashHistory,
	routeTree,
});

window.addEventListener('vite:preloadError', () => {
	window.location.reload();
});

const App = () => <RouterProvider router={router}/>;

export default App;
