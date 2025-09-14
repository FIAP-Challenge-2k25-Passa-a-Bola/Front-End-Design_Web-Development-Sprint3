import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="w-full h-8 bg-white flex justify-center gap-4">
        <img src="/images/fiap-logo.png" alt="logo FIAP" className="h-8" />
        <img src="/images/kto-logo.png" alt="logo KTO" className="h-8" />
        <img src="/images/adidas-logo.png" alt="logo Adidas" className="h-8" />
      </div>

      <nav className="bg-[#e58fb7] border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/home" className="text-2xl font-bold"> <img src="/images/logo-sem-fundo.png"alt="Logo"className="h-8 w-auto"
            /></Link>
          <div className="space-x-6">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/feed" className="hover:underline">Feed</Link>
            <Link to="/promocoes" className="hover:underline">Promoções</Link>
            <Link to="/explorar" className="hover:underline">Explorar</Link>
            <Link to="/perfil" className="hover:underline">Perfil</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}