import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [],
  },

  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
