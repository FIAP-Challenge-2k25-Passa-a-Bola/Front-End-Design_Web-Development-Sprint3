import { useEffect, useState } from "react";

export default function Perfil() {
  const [userdata, setUserdata] = useState({ username: "", email: "", senha: "" });
  const [userPreferencia, setUserPreferencia] = useState("");
  const [userTime, setUserTime] = useState("");
  const [userRegiao, setUserRegiao] = useState("");
  const [savedPreferencia, setSavedPreferencia] = useState("");
  const [savedTime, setSavedTime] = useState("");
  const [savedRegiao, setSavedRegiao] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const savedUserdata = localStorage.getItem("userdata");
    const pref = localStorage.getItem("preferencia");
    const t = localStorage.getItem("time");
    const r = localStorage.getItem("regiao");
    const fotoData = localStorage.getItem("foto");
    const videoData = localStorage.getItem("video");

    if (fotoData) setFoto(fotoData);
    if (savedUserdata) setUserdata(JSON.parse(savedUserdata));
    if (pref) setSavedPreferencia(pref);
    if (t) setSavedTime(t);
    if (r) setSavedRegiao(r);
    if (videoData) setVideo(videoData);
  }, []);

  const handlePost = () => {
    if (userPreferencia.trim() === "" || userTime.trim() === "" || userRegiao.trim() === "") return;
    localStorage.setItem("preferencia", userPreferencia);
    localStorage.setItem("time", userTime);
    localStorage.setItem("regiao", userRegiao);
    setSavedPreferencia(userPreferencia);
    setSavedTime(userTime);
    setSavedRegiao(userRegiao);
    alert("Preferências salvas com sucesso!");
  }

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
        localStorage.setItem("foto", reader.result);
      };
      reader.readAsDataURL(file);
      alert(`Arquivo ${file.name} selecionado para upload! (Funcionalidade de upload não implementada)`);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
        localStorage.setItem("video", reader.result);
      };
      reader.readAsDataURL(file);
      alert(`Arquivo ${file.name} selecionado para upload! (Funcionalidade de upload não implementada)`);
    }
  };

  if (!userdata.username) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Nenhum dado de usuário encontrado. Por favor, configure sua conta no feed.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-pink-100 rounded-lg shadow-md">
      <div className="flex flex-col items-center pb-2 mb-2">
      {setFoto && <img src={foto} alt="Foto do usuário" className="w-32 h-32 rounded-full mt-4" />}
      </div>
      <h1 className="text-3xl font-bold mb-4 text-pink-800">Perfil de {userdata.username}</h1>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Nome de Usuário:</span> {userdata.username}
      </p>
      <p className="text-gray-700 mb-2">  
        <span className="font-semibold">Email:</span> {userdata.email}
      </p>
      <p className="text-gray-700"> 
        <span className="font-semibold">Senha:</span> {"*".repeat(userdata.senha.length)}
      </p>
      <label htmlFor="fileInput" className="bg-pink-50 text-black px-4 py-2 rounded-lg hover:bg-pink-300 cursor-pointer gap-2 mt-4 inline-block ">
        Adicionar Foto de perfil
      </label>
      <input type="file" id="fileInput" className="hidden" onChange={handleFotoChange} />
      <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900 gap-2 mt-4 inline-block" value={userPreferencia} onChange={(e) => setUserPreferencia(e.target.value)} type="text" id="preferencias" placeholder="Suas preferências de jogos (ex: meio campo)"/>
      <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900 gap-2 mt-4 inline-block" value={userTime} onChange={(e) => setUserTime(e.target.value)} type="text" id="time" placeholder="Seu time do coração"/>
      <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900 gap-2 mt-4 inline-block" value={userRegiao} onChange={(e) => setUserRegiao(e.target.value)} type="text" id="regiao" placeholder="Região melhor para jogar"/>

      <button onClick={handlePost} className="bg-pink-50 text-black px-4 py-2 rounded-lg hover:bg-pink-300 gap-2 mt-4 inline-block">
        Salvar Preferências
      </button>

      {savedPreferencia && (
        <p className="text-gray-700 mt-4">
          <span className="font-semibold">Preferência de jogo:</span> {savedPreferencia}
        </p>
      )}
      {savedTime && (
        <p className="text-gray-700">
          <span className="font-semibold">Time do coração:</span> {savedTime}
        </p>
      )}
      {savedRegiao && (
        <p className="text-gray-700">
          <span className="font-semibold">Região para jogar:</span> {savedRegiao}
        </p>
      )}

    </div>
    
  );
}
