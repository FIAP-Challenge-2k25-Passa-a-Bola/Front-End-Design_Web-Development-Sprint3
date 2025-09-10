import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../pages/adminlayout.jsx";
import Feed from "../pages/feed.jsx";
import Promocoes from "../pages/promocoes.jsx";
import Explorar from "../pages/explorar.jsx";
import Perfil from "../pages/perfil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "feed", element: <Feed /> },
      { path: "promocoes", element: <Promocoes /> },
      { path: "explorar", element: <Explorar /> },
      { path: "perfil", element: <Perfil /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
