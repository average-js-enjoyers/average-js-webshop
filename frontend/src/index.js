import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import Example from "./Components/Example";
import Example2 from "./Components/Example2";
import UserCreator from "./Components/SignUpForm";
import FAQ from "./Components/FAQ";





const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/example",
        element: <Example/>,
      },
      {
        path: "/example2",
        element: <Example2/>,
      },
      {
        path: "/signup",
        element: <UserCreator/>,
      },
      {
        path: "/faq",
        element: <FAQ/>,
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
