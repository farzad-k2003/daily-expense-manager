import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { Dashboard, Monthly, Settings } from "../pages";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/daily-expense-manager/", element: <Dashboard /> },
      { path: "/daily-expense-manager/monthly", element: <Monthly /> },
      { path: "/daily-expense-manager/settings", element: <Settings /> },
    ],
  },
]);
