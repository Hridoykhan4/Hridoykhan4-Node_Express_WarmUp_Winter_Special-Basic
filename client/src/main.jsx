import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import UserDetails from "./components/UserDetails.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import UserProvider from "./Provider/UserProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: 'e'
      }
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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
