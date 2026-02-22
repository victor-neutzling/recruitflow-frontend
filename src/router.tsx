import { withAuthenticationRequired } from "@auth0/auth0-react";
import { lazy, type ComponentType } from "react";
import { createBrowserRouter } from "react-router";

const Home = lazy(() => import("./pages/home"));
const Error = lazy(() => import("./pages/error"));

const Board = lazy(() => import("./pages/board"));
const List = lazy(() => import("./pages/list"));

const Application = lazy(() => import("./pages/application"));

export function protectRoute<P extends object>(
  Component: ComponentType<P>,
): ComponentType<P> {
  return withAuthenticationRequired(Component);
}

const ProtectedBoard = protectRoute(Board);
const ProtectedList = protectRoute(List);
const ProtectedApplication = protectRoute(Application);

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Error />,
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/board",
    element: <ProtectedBoard />,
  },
  {
    path: "/list",
    element: <ProtectedList />,
  },
  {
    path: "/application/:mode/:id?",
    element: <ProtectedApplication />,
  },
]);
