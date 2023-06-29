import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "../../components/navbar";

import ErrorPage from "../../pages/error_ui";
import Login from "../../pages/login_ui";
import GameStats from "../../pages/game_stats_ui";
import TournementCreator from "../../pages/tournement_creator_ui";
import Account from "../../pages/account_ui";
import HomePageUi from "../../pages/homepage_ui";

export default function Router() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "homepage/game-stats",
          element: <HomePageUi body={<GameStats />} />,
        },
        {
          path: "homepage/tournement-creator",
          element: <HomePageUi body={<TournementCreator />} />,
        },
        {
          path: "homepage/account",
          element: <HomePageUi body={<Account />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
