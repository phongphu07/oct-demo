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
import ContactUs from "../pages/contact";
import LoginPage from "../pages/login";
import GuidePage from "../pages/guide";

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
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/guide",
        element: <GuidePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
