import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Faixa de logos */}
      <div className="w-full h-8 bg-white flex justify-center items-center gap-4">
        <img src="/images/fiap-logo.png" alt="FIAP" className="h-6 md:h-8" />
        <img src="/images/kto-logo.png" alt="KTO" className="h-6 md:h-8" />
        <img src="/images/adidas-logo.png" alt="Adidas" className="h-6 md:h-8" />
      </div>

      {/* NAV */}
      <nav className="bg-[#e58fb7] border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-1.5">
          {/* Marca (sem negrito e sempre visível) */}
          <Link to="/home" className="flex items-center gap-2">
            <img src="/images/logo-sem-fundo.png" alt="Logo" className="h-8 w-auto mt-3 mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-110" />
          </Link>

          {/* Botão hambúrguer — só ≤ 426px */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-controls="nav-links"
            aria-expanded={open ? "true" : "false"}
            className="hidden max-[426px]:inline-flex items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="sr-only">Abrir menu</span>
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Links desktop — só > 426px */}
          <div className="hidden min-[427px]:flex items-center gap-6 text-sl">
            <Link to="/home" className="transition-colors duration-300 hover:text-white">Home</Link>
            <Link to="/feed" className="transition-colors duration-300 hover:text-white">Feed</Link>
            <Link to="/sobrenos" className="transition-colors duration-300 hover:text-white">Sobre nós</Link>
            <Link to="/explorar" className="transition-colors duration-300 hover:text-white">Explorar</Link>
            <Link to="/perfil" className="transition-colors duration-300 hover:text-white">Perfil</Link>
          </div>
        </div>

        {/* Links mobile — ≤ 426px, controlados por `open` */}
        <div
          id="nav-links"
          className={`${open ? "block" : "hidden"} min-[427px]:hidden border-t border-black/10`}
        >
          <ul className="px-4 py-3 flex flex-col gap-3 text-sm">
            <li><Link onClick={() => setOpen(false)} to="/home" className="block hover:text-white transition-colors">Home</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/feed" className="block hover:text-white transition-colors">Feed</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/sobrenos" className="block hover:text-white transition-colors">Sobre nós</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/explorar" className="block hover:text-white transition-colors">Explorar</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/perfil" className="block hover:text-white transition-colors">Perfil</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}