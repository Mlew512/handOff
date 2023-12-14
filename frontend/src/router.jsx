import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/RegisterPage";
import APatient from "./pages/APatient";
import Patients from "./pages/Patients";
import Encounters from "./pages/Encounters";
import AddAssessments from "./components/AddAssessment";
import AllAssessments from "./pages/AllAssessments";

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
      {
        path: "patient/:id/",
        element: <APatient />, 
      },
      {
        path: "patients/",
        element: <Patients />,
      },
      {
        path: "encounters/:id/",
        element: <Encounters />,
      },
      {
        path: "encounter/:id/addassessment/:pt_id/",
        element: <AddAssessments />,
      },
      {
        path: "allassessments/:id/",
        element: <AllAssessments />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
export default router;
