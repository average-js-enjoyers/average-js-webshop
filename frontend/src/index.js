import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/css/index.css";

import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import UserCreator from "./Components/Forms/SignUpForm";
import FAQ from "./Components/Miscellaneous/FAQ";

import Button from "react-bootstrap/Button";

import UITemplateExamplesPage from "./Pages/UITemplateExamplesPage";
import UserModifier from "./Pages/UserModifier";
import UserLogin from "./Pages/UserLogin";

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
        path: "/signin",
        element: <UserLogin />,
      },
    ],
  },
  {
    path: "/ui-template",
    element: <UITemplateExamplesPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "example",
        element: <Button variant="primary">Go To Example</Button>,
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
