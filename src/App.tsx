import './App.css';
import './i18n';
import {RouterProvider, createRouter, createHashHistory} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const hashHistory = createHashHistory()
const router = createRouter({ basepath:'/',
	routeTree,
	history: hashHistory
});

window.addEventListener('vite:preloadError', () => {
	window.location.reload();
});

const App = () => <RouterProvider router={router}/>;

export default App;
