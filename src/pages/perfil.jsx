import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Perfil() {
  const [userdata] = useState(() => {
    try {
      const raw = localStorage.getItem("userdata");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed || null;
    } catch {
      return null;
    }
  });

  const [foto, setFoto] = useState(() => {
    const f = localStorage.getItem("foto");
    return f || "/images/icone-usuario.png";
  });

  const [userPreferencia, setUserPreferencia] = useState("");
  const [userTime, setUserTime] = useState("");
  const [userRegiao, setUserRegiao] = useState("");

  const [savedPreferencia, setSavedPreferencia] = useState(() => localStorage.getItem("preferencia") || "");
  const [savedTime, setSavedTime] = useState(() => localStorage.getItem("time") || "");
  const [savedRegiao, setSavedRegiao] = useState(() => localStorage.getItem("regiao") || "");

  const location = useLocation();
  const navigate = useNavigate();

  const isAuthed = !!(userdata?.username?.trim() || userdata?.email?.trim());
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: location }} />;

  const handleSalvarPreferencias = () => {
    if (userPreferencia.trim()) {
      localStorage.setItem("preferencia", userPreferencia.trim());
      setSavedPreferencia(userPreferencia.trim());
    }
    if (userTime.trim()) {
      localStorage.setItem("time", userTime.trim());
      setSavedTime(userTime.trim());
    }
    if (userRegiao.trim()) {
      localStorage.setItem("regiao", userRegiao.trim());
      setSavedRegiao(userRegiao.trim());
    }
    alert("Preferências salvas com sucesso!");
    setUserPreferencia("");
    setUserTime("");
    setUserRegiao("");
  };

  const handleFotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFoto(dataUrl);
      localStorage.setItem("foto", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSair = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("foto");
    localStorage.removeItem("preferencia");
    localStorage.removeItem("time");
    localStorage.removeItem("regiao");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Capa atrás (z-0 pra ficar atrás do container do perfil e das informações do user) */}
      <div className="relative h-48 sm:h-56 bg-gradient-to-r from-[#F24B99] via-[#C71C8D] to-[#B70088] z-0" />

      {/* Cartão principal por cima (z-10) */}
      <div className="relative z-10 max-w-3xl mx-auto -mt-16 px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-black/10 p-6 sm:p-8">
          {/* Foto do usuário com mais algumas caixas */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-slate-100 overflow-hidden ring-4 ring-white shadow">
                <img src={foto || "/images/icone-usuario.png"} alt="Foto do usuário" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-pink-800">
                  {userdata.username || "Usuária"}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base break-all">{userdata.email || "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="fileInput"
                className="px-4 py-2 rounded-lg border border-gray-300 text-slate-700 cursor-pointer
                           hover:bg-[#F24B99] hover:text-white hover:border-[#F24B99] transition-colors"
              >
                Alterar foto
              </label>
              <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFotoChange} />
              <button
                onClick={handleSair}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                Sair
              </button>
            </div>
          </div>

          {/* Dados básicos */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Nome de usuário</p>
              <p className="font-semibold text-pink-900">{userdata.username || "—"}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Email</p>
              <p className="font-semibold text-pink-900 break-all">{userdata.email || "—"}</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">Senha</p>
              <p className="font-semibold text-pink-900">
                {"*".repeat(userdata.senha?.length || 0) || "—"}
              </p>
            </div>
          </div>

          {/* Preferências do usuário*/}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-pink-800">Preferências</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <input
                className="w-full p-2 border border-gray-300 rounded-lg text-pink-900"
                value={userPreferencia}
                onChange={(e) => setUserPreferencia(e.target.value)}
                type="text"
                id="preferencias"
                placeholder={savedPreferencia ? `Atual: ${savedPreferencia}` : "Suas preferências (ex: meio-campo)"}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg text-pink-900"
                value={userTime}
                onChange={(e) => setUserTime(e.target.value)}
                type="text"
                id="time"
                placeholder={savedTime ? `Atual: ${savedTime}` : "Seu time do coração"}
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg text-pink-900"
                value={userRegiao}
                onChange={(e) => setUserRegiao(e.target.value)}
                type="text"
                id="regiao"
                placeholder={savedRegiao ? `Atual: ${savedRegiao}` : "Região melhor para jogar"}
              />
            </div>

            <div className="mt-4">
              <button
                onClick={handleSalvarPreferencias}
                className="bg-[#F24B99] text-white px-5 py-2.5 rounded-lg hover:bg-[#91305d] transition-colors"
              >
                Salvar preferências
              </button>
            </div>

            {(savedPreferencia || savedTime || savedRegiao) && (
              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-slate-700">
                {savedPreferencia && <p><span className="font-semibold">Preferência:</span> {savedPreferencia}</p>}
                {savedTime && <p><span className="font-semibold">Time:</span> {savedTime}</p>}
                {savedRegiao && <p><span className="font-semibold">Região:</span> {savedRegiao}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}