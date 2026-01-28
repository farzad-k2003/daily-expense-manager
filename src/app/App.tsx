import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./style.css";

export function App() {
    return <RouterProvider router={router} />;
}
