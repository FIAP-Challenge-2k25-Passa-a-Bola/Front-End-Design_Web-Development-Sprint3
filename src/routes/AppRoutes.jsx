import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "../pages/userlayout.jsx";
import Feed from "../pages/feed.jsx";
import SobreNos from "../pages/sobrenos.jsx";
import Explorar from "../pages/explorar.jsx";
import Perfil from "../pages/perfil.jsx";
import Home from "../pages/home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "feed", element: <Feed /> },
      { path: "sobrenos", element: <SobreNos /> },
      { path: "explorar", element: <Explorar /> },
      { path: "perfil", element: <Perfil /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
