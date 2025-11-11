import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserDetails from "./components/UserDetails.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import UserProvider from "./Provider/UserProvider.jsx";
import Home from "./components/Home.jsx";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import CoffeeDetails from "./components/CoffeeDetails.jsx";
import Login from "./components/Login.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import SignUp from "./components/SignUp.jsx";
import SignedUpUsers from "./components/signedUpUsers.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/coffees`),
        hydrateFallbackElement: <p>Loading .. </p>,
      },
      {
        path: "/coffees/:id",
        element: <CoffeeDetails></CoffeeDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/coffees/${params.id}`),
      },

      {
        path: "/addCoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "updateCoffee",
        element: <UpdateCoffee></UpdateCoffee>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/users",
        element: <SignedUpUsers></SignedUpUsers>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/users`),
      },

      /*  {
        path: "/users/:id",
        element: <UserDetails></UserDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        hydrateFallbackElement: <p>Loading .. </p>,
      },
      {
        path: "/users/update/:id",
        element: <UpdateUser></UpdateUser>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
        hydrateFallbackElement: <p>Loading .. </p>,
      }, */
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
