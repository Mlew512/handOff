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
import AnAssessment from "./pages/AnAssessment";
import EditAssessment from "./pages/EditAssessment";
import AddEncounter from "./pages/AddEncounter";
import EditEncounter from "./pages/EditEncounter";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import SearchResults from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "register/",
        element: <Register />,
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
      {
        path: "assessments/:id/",
        element: <AnAssessment />,
      },
      {
        path: "assessments/:id/edit/",
        element: <EditAssessment />,
      },
      {
        path: "patient/:id/addencounter",
        element: <AddEncounter />,
      },
      {
        path: "encounter/:id/edit/",
        element: <EditEncounter />,
      },
      {
        path: "encounter/:id/edit/",
        element: <EditEncounter />,
      },
      {
        path: "patient/:id/edit/",
        element: <EditPatient />,
      },
      {
        path: "patients/add/",
        element: <AddPatient />,
      },
      {
        path: "search/:searchValue",
        element: <SearchResults />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
export default router;
