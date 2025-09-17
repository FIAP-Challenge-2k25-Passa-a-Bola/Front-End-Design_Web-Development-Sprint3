import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setMail] = useState("");
  const [senha, setSenha] = useState("");

  const [fotoPreview, setFotoPreview] = useState("/images/icone-usuario.png");
  const [fotoDataUrl, setFotoDataUrl] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const onFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoPreview(URL.createObjectURL(file)); 
    const reader = new FileReader();           
    reader.onloadend = () => setFotoDataUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleLogin = () => {
    // aceita qualquer entrada
    const userdata = { username, email, senha, loggedAt: new Date().toISOString() };
    localStorage.setItem("userdata", JSON.stringify(userdata));

    // salva a foto que foi enviada (ou a padrão do site)
    const fotoFinal = fotoDataUrl || "/images/icone-usuario.png";
    localStorage.setItem("foto", fotoFinal);

    alert("Cadastro validado!");
    navigate(location.state?.from?.pathname || "/perfil", { replace: true });
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 mt-[-20]">
      <section className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7d234d] via-[#942d5f] to-[#650b4e]" />
        <img
          src="/images/foto-fundo.png"
          alt="Passa a Bola — comunidade"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-white max-w-xl">
            <h1 className="font-fredoka font-extrabold text-5xl leading-tight drop-shadow-md">
              Bem-vinda ao Passa a Bola
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Entre para postar, interagir e acompanhar o <span className="font-semibold">Futebol Feminino</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário pra inserir os dados do usuário*/}
      <section className="flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <div className="mb-8 text-center">
            <img src="/images/logo-sem-fundo.png" alt="Passa a Bola" className="mx-auto h-14 w-auto" />
            <h2 className="mt-4 font-fredoka text-3xl font-extrabold text-[#B70088]">Entrar</h2>
            <p className="mt-1 text-sm text-slate-500">Preencha e clique em entrar</p>
          </div>

          <div className="space-y-4 bg-white/60 backdrop-blur-sm border border-black/10 rounded-2xl p-6 shadow-sm">

            {/* Foto do perfil */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-slate-100 overflow-hidden">
                <img src={fotoPreview} alt="Foto do perfil" className="w-full h-full object-cover" />
              </div>
              <label
                htmlFor="foto"
                className="px-3 py-2 rounded-lg border border-gray-300 text-slate-700 cursor-pointer
                           hover:bg-[#F24B99] hover:text-white hover:border-[#F24B99] transition-colors">
                Selecionar foto
              </label>
              <input id="foto" type="file" accept="image/*" className="hidden" onChange={onFotoChange} />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">Nome de usuário</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-slate-900
                           focus:outline-none focus:ring-2 focus:ring-[#F24B99] focus:border-transparent"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
                placeholder="seu@email.com"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-slate-900
                           focus:outline-none focus:ring-2 focus:ring-[#F24B99] focus:border-transparent"/>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Senha</label>
              <input
                id="password"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-slate-900
                           focus:outline-none focus:ring-2 focus:ring-[#F24B99] focus:border-transparent"/>
            </div>

            <button
              onClick={handleLogin}
              className="w-full rounded-xl bg-[#F24B99] px-4 py-2.5 text-white font-semibold shadow
                         hover:bg-[#91305d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F24B99]">
              Entrar
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Este login aceita qualquer credencial (modo simplificado para desnvolvimento).
          </p>
        </div>
      </section>
    </main>
  );
}