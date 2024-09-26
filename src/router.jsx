import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const Router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        
        children: [
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/login",
                element: < Login/>
            }
        ]
    }
]);