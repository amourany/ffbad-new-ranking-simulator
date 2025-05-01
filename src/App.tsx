import './App.css';
import './i18n';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const basePath = import.meta.env['BASE_URL'];
const router = createRouter({ basepath:basePath,
	routeTree });

window.addEventListener('vite:preloadError', () => {
	window.location.reload();
});

const App = () => <RouterProvider router={router}/>;

export default App;
