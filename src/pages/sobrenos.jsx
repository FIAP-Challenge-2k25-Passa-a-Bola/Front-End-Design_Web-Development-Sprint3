import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function SobreNos() {
  return (
    <>
      <section className="w-full">
        <div className="relative w-full h-[68vh] md:h-[88vh] overflow-hidden">
          <img
            src="/images/foto-fundo.png"
            alt="Passa a Bola — comunidade"
            className="absolute inset-0 w-full h-full object-cover object-[40%_70%]"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="relative max-w-[85rem] mx-auto h-full lg:px-4 sm:px-0 md:px-10">
            <div className="flex h-full items-center">
              <div className="w-full">
                <h1
                  className="font-fredoka font-extrabold text-white leading-tight
                             ml-5 sm:text-left
                             text-4xl sm:text-6xl md:text-6xl sm:p-5 sm:mt-6 sm:ml-[1.625rem]"
                >
                  Nossa missão é ser
                  <br />
                  o maior canal do mundo
                  <br />
                  de{" "}
                  <span className="text-[#F24B99] hover:text-[#91305d] transition duration-200 cursor-pointer">
                    Futebol Feminino
                  </span>
                </h1>

                <a
                  href="https://www.instagram.com/passaabola/"
                  className="inline-block mt-6 ml-[3rem] rounded-md bg-[#F24B99] px-5 py-2.5 text-white font-medium shadow-sm
                             hover:bg-[#91305d] focus:outline-none focus:ring-2 focus:ring-white/70 transition-colors sm:mr-auto"
                >
                  Conheça a nossa página
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 mt-5">
          <div className="font-inter text-black text-xl sm:text-2xl leading-relaxed md:leading-loose space-y-10">
            <p>
              O <span className="text-[#F24B99] font-semibold">Passa a Bola</span> Foi criado em 20XX por Luana Maluf e Alê Xavier com o objetivo de difundir o{" "}
              <span className="text-[#F24B99] font-semibold">Futebol Feminino pelo Brasil</span>, Incentivando a prática do esporte pelas meninas
            </p>

            <p>
              Estamos constantemente organizando eventos para estimular o desenvolvimento no esporte e até mesmo a competitividade{" "}
              <span className="text-[#F24B99] font-semibold">para as crianças e adolescentes </span> e não vemos a hora do Futebol praticado por mulheres
              ter o seu devido lugar na mídia e na boca do povo
            </p>

            <p>
              <span className="text-[#F24B99] font-semibold">Em parceria com a FIAP</span>{" "}
              estamos desenvolvendo um lugar para descontrair, conhecer pessoas e principalmente, <span className="text-[#F24B99] font-semibold"> Disceminar o futebol feminino </span> 
               diretamente do Brasil pro resto do mundo
            </p>
          </div>
        </div>
      </div>

    </>
  );
}