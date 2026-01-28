import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { Dashboard, Monthly, Settings } from "../pages";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/monthly", element: <Monthly /> },
            { path: "/settings", element: <Settings /> },
        ],
    },
]);
