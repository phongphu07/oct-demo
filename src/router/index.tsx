import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout";
import DemoPage from "../pages/demo";
// import DocsPage from "../pages/docs";
import AboutPage from "../pages/about";
import HomePage from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/demo",
        element: <DemoPage />,
      },
      {
        path: "/demo",
        element: <DemoPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
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
