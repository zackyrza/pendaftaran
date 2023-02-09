import { createBrowserRouter } from "react-router-dom";
import Home from "Pages/Home";
import Error from "Pages/Error";
import Login from "Pages/Login";
import Pendaftaran from "Pages/Pendaftaran";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/masuk",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/pendaftaran",
    element: <Pendaftaran />,
    errorElement: <Error />,
  },
]);

export default routes;
