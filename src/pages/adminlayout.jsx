import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
