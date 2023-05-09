import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

import "./index.css";
import { ROUTES } from "./paths";
import App from "./App";
import {  AuthMe } from "./features/auth/authMe";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <h1>1</h1>,
  },
  {
    path: ROUTES.login,
    element: <h1>Login</h1>,
  },
  {
    path: ROUTES.register,
    element: <h1>register</h1>,
  },
]);
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthMe>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
      </AuthMe>
    </Provider>
  </React.StrictMode>
);
