import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [open, setOpen] = useState(false);

  const item = "block py-2 px-3 rounded md:p-0";
  const idle =
    "font-poppins text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black transition-colors duration-300 dark:text-white";
  const active =
    "text-white md:hover:text-black transition-colors duration-300";

  const imagens = [
    "/images/img-home.png",
    "/images/img2-home.png",
    "/images/img3-home.png",
  ];

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((i) => (i + 1) % imagens.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [imagens.length]);

  const mudar = (i) => setIndice((i + imagens.length) % imagens.length);

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Carrossel */}
      <div className="relative w-full max-w-screen-xl mx-auto h-[350px] overflow-hidden mt-6">
        {imagens.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === indice ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Botões de controle */}
        <button
          onClick={() => mudar(indice - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() => mudar(indice + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
        >
          ›
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {imagens.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndice(i)}
              className={`w-3 h-3 rounded-full ${
                i === indice ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo debaixo */}
      <section className="max-w-screen-xl mx-auto p-6">
        {/* Conteúdo é apartir daqui */}
      </section>

      <Footer>
        
      </Footer>

    </div>

  );
}