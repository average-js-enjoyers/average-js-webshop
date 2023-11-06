import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import App from "App";
import MainLayout from "components/layout/MainLayout";

import HomeScreen from "screens/HomeScreen";
import ErrorScreen from "screens/ErrorScreen";
import SignUpScreen from "screens/auth/QuickSignUpScreen";
import UITemplateExamplesScreen from "screens/UITemplateExamplesScreen";
import ViewProfileScreen from "screens/profile/ViewProfileScreen";
import EditProfileScreen from "screens/profile/EditProfileScreen";
import SignInScreen from "screens/auth/SignInScreen";
import NotFoundScreen from "screens/NotFoundScreen";

import "assets/styles/css/index.css";

// Recommended (new) router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<MainLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="/profile/edit" element={<EditProfileScreen />} />
        <Route path="/profile" element={<ViewProfileScreen />} />
      </Route>

      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />

      {/* other routes */}
      {/*  <Route path="/product/:id" element={<ProductScreen />} /> */}
      {/* <Route path="/cart" element={<CartScreen />} /> */}

      {/* For Development: */}
      <Route path="/ui-template" element={<UITemplateExamplesScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Route>
  ),
  {
    // Provide an error element for the entire application
    errorElement: <ErrorScreen />,
  }
);

// Traditional router setup
//import Button from "react-bootstrap/Button";
/* const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/signup",
        element: <SignUpScreen />,
      },
      {
        path: "/profile/edit",
        element: <EditProfileScreen />,
      },
      {
        path: "/signin",
        element: <SignInScreen />,
      },
    ],
  },
  {
    path: "/ui-template",
    element: <UITemplateExamplesScreen />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "example",
        element: <Button variant="primary">Go To Example</Button>,
      },
    ],
  },
]); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
