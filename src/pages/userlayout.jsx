import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
