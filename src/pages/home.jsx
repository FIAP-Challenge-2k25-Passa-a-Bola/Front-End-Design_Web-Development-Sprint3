import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Home() {
  const [open, setOpen] = useState(false);

  const item = "block py-2 px-3 rounded md:p-0";
  const idle ="font-poppins text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black transition-colors duration-300 dark:text-white";
  const active = "text-white md:hover:text-black transition-colors duration-300";

  return (
    <div className="min-h-screen bg-white text-white">

      {/* HEADER EM BRANCO */}
      <div className="w-full h-8 bg-white flex justify-center">
        <img src="./images/fiap-logo.png" alt="logo FIAP" className="h-8"/>
        <img src="./images/kto-logo.png" alt="logo KTO" className="h-8"/>
        <img src="./images/adidas-logo.png" alt="logo Adidas" className="h-8"/>
      </div>
      {/* NAVBAR */}
      <nav className="bg-[#e58fb7] border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-3">
          <Link to="/home">
            <img
              src="/images/logo-sem-fundo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          <button
            type="button"
            aria-controls="menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen(!open)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Links */}
          <div
            id="menu"
            className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}
          >
            <ul className="text-xs flex flex-col mt-4 gap-4 md:flex-row md:items-center md:gap-6 md:mt-0">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `${item} ${isActive ? active : idle}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/feed"
                  className={({ isActive }) =>
                    `${item} ${isActive ? active : idle}`
                  }
                >
                  Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explorar"
                  className={({ isActive }) =>
                    `${item} ${isActive ? active : idle}`
                  }
                >
                  Explorar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/promocoes"
                  className={({ isActive }) =>
                    `${item} ${isActive ? active : idle}`
                  }
                >
                  Promoções
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) =>
                    `${item} ${isActive ? active : idle}`
                  }
                >
                  Perfil
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Conteúdo abaixo */}
      <section className="max-w-screen-xl mx-auto p-6"></section>
    </div>
  );
}