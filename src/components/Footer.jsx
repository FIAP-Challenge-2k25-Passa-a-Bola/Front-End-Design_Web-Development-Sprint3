export default function Footer() {   
    return (

        <footer className="bg-[#F24B99] text-white bottom-0 w-full shadow-md">
            
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        
        {/*Logo e descrição */}
        <div>
          <a href="./home"><img
            src="/images/logo-sem-fundo.png"
            alt="Logo"
            className="h-10 mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-110"
          /></a>
          <p className="text-sm text-white transition-colors duration-200 hover:text-pink-200">
            Plataforma voltada para explorar conteúdos, promoções e novidades
            do esporte.
          </p>
        </div>

        {/*Links principais */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Navegação</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="./home" className="transition-colors duration-300 hover:text-pink-200">Home</a></li>
            <li><a href="./feed" className="transition-colors duration-300 hover:text-pink-200">Feed</a></li>
            <li><a href="./sobrenos" className="transition-colors duration-300 hover:text-pink-200">Sobre nós</a></li>
            <li><a href="./explorar" className="transition-colors duration-300 hover:text-pink-200">Explorar</a></li>
            <li><a href="./perfil" className="transition-colors duration-300 hover:text-pink-200">Perfil</a></li>
          </ul>
        </div>

        {/*Contato */}
        <div>
          <h2 className="text-lg font-semibold mb-4 ">Contato</h2>
          <p className="text-sm text-white hover:text-pink-200 cursor-pointer">Email: contato@passaabola.com</p>
          <p className="text-sm text-white hover:text-pink-200 cursor-pointer">WhatsApp: (11) 99999-9999</p>
          <p className="text-sm text-white hover:text-pink-200 cursor-pointer">
            Instagram:{" "}
            <a 
                href="https://www.instagram.com/passaabola/" 
                target="_blank" 
                rel="noopener noreferrer" 

            >
                @passaabola
            </a>
            </p>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-pink-400">
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9..."/></svg>
            </a>
            <a href="#" className="hover:text-pink-400">
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.28 448H7.4..."/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Todos os direitos reservados */}
      <div className="border-t border-white text-center py-4 text-sm text-white hover:text-pink-200 cursor-pointer">
        © {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
      </div>
    </footer>
    );
}