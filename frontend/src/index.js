import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/css/index.css";

import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
// import Example from "./Components/Miscellaneous/Example";
import Example2 from "./Components/Miscellaneous/Example2";
import UserCreator from "./Components/Forms/SignUpForm";
import FAQ from "./Components/Miscellaneous/FAQ";

import Button from "react-bootstrap/Button";

import UITemplateExamplesPage from "./Pages/UITemplateExamplesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/example",
        element: <Button variant="primary">Go To Example</Button>,
      },
      {
        path: "/example2",
        element: <Example2 />,
      },
      {
        path: "/signup",
        element: <UserCreator />,
      },
      {
        path: "/faq",
        element: <FAQ />,
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
