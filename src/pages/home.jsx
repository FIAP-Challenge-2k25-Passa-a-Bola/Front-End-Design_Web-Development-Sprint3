import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const imagens = [
    "/images/img-home.png",
    "/images/img2-home.png",
    "/images/img3-home.png",
  ];

  const [indice, setIndice] = useState(0);
  const mudar = (i) => setIndice((i + imagens.length) % imagens.length);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Carrossel */}
      <div className="relative w-full mx-auto h-[731px] overflow-hidden">
        <img
          src={imagens[indice]}
          alt={`slide-${indice}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Botões de controle */}
        <button
          onClick={() => mudar(indice - 1)}
          className="h-15 w-10 absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white text-3xl rounded-full"
        >
          ‹
        </button>
        <button
          onClick={() => mudar(indice + 1)}
          className="h-15 w-10 absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white text-3xl rounded-full"
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

      <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20 mt-5">
        <div className="font-inter text-black text-xl sm:text-2xl leading-relaxed md:leading-loose space-y-10">
          <p>
            O <span className="text-[#F24B99] font-semibold">Passa a Bola</span> nasceu da paixão pelo futebol e da força
            de um coletivo de meninas que jogam por amor ao esporte. Mais que um campo, criamos
            um espaço onde <span className="text-[#F24B99] font-semibold">cada passe é uma história.</span>
          </p>

          <p>
            Aqui, somos amigas dentro e fora das quatro linhas. Nossa comunidade é feita de
            histórias, risadas e apoio mútuo, onde <span className="text-[#F24B99] font-semibold">cada voz tem espaço</span> e cada conquista é
            celebrada em conjunto.
          </p>

          <p>
            <span className="text-[#F24B99] font-semibold">Este portal é o nosso ponto de encontro digital:</span> um lugar para compartilhar experiências,
            postar conteúdos e fortalecer os laços que o futebol nos deu. Porque, no fundo, o que
            nos move é jogar juntas e seguir passando a bola.
          </p>
        </div>
        <div className="mt-8 flex gap-5 font-inter">
          <Link to="/sobrenos"><button className="border border-black px-6 py-1.5 rounded-4xl transition-colors duration-300 hover:bg-[#F24B99] hover:text-white hover:cursor-pointer">Quero saber mais!</button></Link>
          <Link to="/feed"><button className="border border-black px-6 py-1.5 rounded-4xl transition-colors duration-300 hover:bg-[#F24B99] hover:text-white hover:cursor-pointer"> Quero ver os posts!</button></Link>
      </div>
      
      </div>
      <div className="w-full mt-10 mb-10">
          <div className="border-b border-5 border-[#F24B99]">

          </div>
      </div>
      <section className="w-full bg-white py-15">
        <h1 className="font-inter text-black text-4xl text-center mb-10">Você sabia que nós também temos um canal do Youtube? <a href="https://www.youtube.com/channel/UCGEtu-1QcpI_wRA7okljuJA"><span className="text-red-600 text-bold hover:cursor-pointer">Confira!</span></a></h1>
        <div className="flex justify-center max-w-6xl mx-auto px-4">
          <div className=" relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg">

            <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/pr4wX4hCVLs"
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

          </div>
        </div>
    </section>
      
    </div>
    </div>
  );
}