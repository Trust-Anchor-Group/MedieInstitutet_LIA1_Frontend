import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

// Creating a router configuration using createBrowserRouter
export const Router = createBrowserRouter([
    {
        path:"/", //Root path
        element: <Layout/>, //Component to render at the root path
        
        children: [ //Nested routes
            {
                index: true, 
                element: <Home/> 
            },
            {
                path: "/register", //Path for the Register component
                element: <Register/> //Component to render at the /register path
            },
            {
                path: "/login", //Path for the login component
                element: < Login/> //Component to render at the /login path
            }
        ]
    }
]);