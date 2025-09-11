import { Link, Outlet } from "react-router-dom";
import Sidebarleft from "../components/Sidebar.jsx";
export default function AdminLayout() {
  return (
    <div className="bg-black min-h-screen text-white">
      <nav className="bg-yellow-400 text-black shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Passa a Bola</h1>
          <div className="space-x-6">
            <Link to="feed" className="hover:underline">Feed</Link>
            <Link to="promocoes" className="hover:underline">Promoções</Link>
            <Link to="explorar" className="hover:underline">Explorar</Link>
            <Link to="perfil" className="hover:underline">Perfil</Link>
          </div>
        </div>
      </nav>
      <main className="p-4 ml-64">
        <Outlet />
        <Sidebarleft />
      </main>
    </div>
  );
}
