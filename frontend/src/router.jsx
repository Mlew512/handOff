import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Register />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "home/",
        element: <Home />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
export default router;
