import { createBrowserRouter } from "react-router-dom";
import RedeemCode from "../pages/RedeemCode.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Game from "../pages/Game.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedeemCode />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

export default router;
