import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
        
        ],
        errorElement: <NotFoundPage />
    }
])
export default router;