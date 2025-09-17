import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Faixa das logos */}
      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4 py-2 px-3 sm:py-3">
          <img src="/images/fiap-logo.png" alt="FIAP" className="h-8 sm:h-9 md:h-10 w-auto" />
          <img src="/images/kto-logo.png" alt="KTO" className="h-8 sm:h-9 md:h-10 w-auto" />
          <img src="/images/adidas-logo.png" alt="Adidas" className="h-8 sm:h-9 md:h-10 w-auto" />
        </div>
      </div>

      {/* Barra de navegação do Passa a Bola */}
      <nav className="bg-[#F24B99]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-3 py-2 sm:px-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-4">
            <img
              src="/images/logo-sem-fundo.png"
              alt="Logo"
              className="h-10 sm:h-12 w-auto cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Botão hambúrguer (pra versão mobile) */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-controls="nav-links"
            aria-expanded={open ? "true" : "false"}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <span className="sr-only">Abrir menu</span>
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-15">
            <Link to="/home" className="text-white font-inter text-lg transition-colors duration-300 hover:text-pink-200">Home</Link>
            <Link to="/feed" className="text-white font-inter text-lg transition-colors duration-300 hover:text-pink-200">Feed</Link>
            <Link to="/sobrenos" className="text-white font-inter text-lg transition-colors duration-300 hover:text-pink-200">Sobre nós</Link>
            <Link to="/explorar" className="text-white font-inter text-lg transition-colors duration-300 hover:text-pink-200">Explorar</Link>
            <Link to="/perfil" className="text-white font-inter text-lg transition-colors duration-300 hover:text-pink-200">Perfil</Link>
          </div>
        </div>

        {/* Links mobile */}
        <div
          id="nav-links"
          className={`${open ? "max-h-96" : "max-h-0"} md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-t border-white/20`}
        >
          <ul className="px-4 py-3 flex flex-col gap-3 text-base">
            <li><Link onClick={() => setOpen(false)} to="/home" className="block text-white/90 hover:text-white transition-colors">Home</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/feed" className="block text-white/90 hover:text-white transition-colors">Feed</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/sobrenos" className="block text-white/90 hover:text-white transition-colors">Sobre nós</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/explorar" className="block text-white/90 hover:text-white transition-colors">Explorar</Link></li>
            <li><Link onClick={() => setOpen(false)} to="/perfil" className="block text-white/90 hover:text-white transition-colors">Perfil</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}