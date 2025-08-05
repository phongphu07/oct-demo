import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout";
import AboutPage from "../pages/about";
import DemoPage from "../pages/demo";
import GuidePage from "../pages/guide";
import LoginPage from "../pages/login";
import ThreeD from "../pages/3d";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DemoPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },

      {
        path: "/guide",
        element: <GuidePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/3d",
        element: <ThreeD />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
