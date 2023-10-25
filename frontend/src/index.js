import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/css/index.css";

import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import UserCreator from "./Pages/UserCreator";
import FAQ from "./Components/FAQ";

import ButtonTemplate from "./Components/templates/ButtonTemplate";
import TypographyTemplate from "./Components/templates/TypographyTemplate";
import UserModifier from "./Pages/UserModifier";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <UserCreator />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/userdata",
        element: <UserModifier />,
      },
      {
        path: "/ui-template",
        element: (
          <>
            <ButtonTemplate />
            <TypographyTemplate />
          </>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
