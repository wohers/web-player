import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "../layout";
import { Home } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { FavoriteTracks } from "../../pages/favorite-tracks";
import { CreateTrack } from "../../pages/create-track";
import { memo, useMemo } from "react";

export const AppRouter = memo(() => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Navigate to={"/web-player"} />,
            },
            {
              path: "/web-player",
              element: <Home />,
            },
            {
              path: "/favourites",
              element: <FavoriteTracks />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegisterPage />,
            },
            {
              path: "/create-track",
              element: <CreateTrack />,
            },
          ],
        },
      ], {
        basename: '/web-player'
      }),
    []
  );

  return <RouterProvider router={router} />;
});
