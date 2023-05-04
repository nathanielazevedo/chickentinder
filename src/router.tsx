import Create from "./components/Create";
import Entry from "./components/Entry";
import Manage from "./components/Manage";
import ResultsPage from "./components/ResultsPage";
import Swipe from "./components/Swipe";
import Intro from "./components/marketing/Intro";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Intro />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/party/:id/vote",
      element: <Swipe />,
    },
    {
      path: "/party/:id/results",
      element: <ResultsPage />,
    },
    {
      path: "/party/:id/manage",
      element: <Manage />,
    },
    {
      path: "/party/:id",
      element: <Entry />,
    },
  ],
  {
    basename: "/chickentinder",
  }
);
