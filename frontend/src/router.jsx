import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import App from './App';
import Login from './pages/LoginPage';
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
            {
                path: 'login/',
                element: <Login />
            }
        
        ],
        errorElement: <NotFoundPage />
    }
])
export default router;