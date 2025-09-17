import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebarleft from "./Sidebar.jsx";

export default function Card() {
  const [textoPost, setTextoPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [midia, setMidia] = useState(null);
  const [localizacao, setLocalizacao] = useState("");

  const navegar = useNavigate();
  const rota = useLocation();
  const autenticado = !!localStorage.getItem("userdata");

  const exigirAutenticacao = () => {
    if (!autenticado) {
      navegar("/login", { state: { from: rota }, replace: true });
      return false;
    }
    return true;
  };

  const postsExemplo = [
    {
      texto: "Galera, vai passar Real Madrid x Juventus às 19h no salão da Sheila — apareçam!",
      categoria: "Jogo Passando!",
      midia: null,
      localizacao: "Salão da Sheila",
    },
    {
      texto: "Alguém pra marcar um jogo no sábado?",
      categoria: "Quero companhia!",
      midia: "https://img.freepik.com/fotos-gratis/mulher-jogando-bola-para-cima_23-2148634558.jpg",
      localizacao: "Região da Vila Matilde",
    },
    {
      texto: "Promoção: 50% no Chop do Bar do seu Zé só para quem usa o App!",
      categoria: "Tem promoção!",
      midia: null,
      localizacao: "Bar do Seu Zé",
    },
  ];

  useEffect(() => {
    const salvos = localStorage.getItem("posts");
    if (salvos) setPosts(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const publicar = () => {
    if (!exigirAutenticacao()) return;
    if (textoPost.trim() === "" || categoria === "") return;
    const novo = { texto: textoPost, categoria, midia, localizacao };
    setPosts([novo, ...posts]);
    setTextoPost("");
    setCategoria("");
    setMidia(null);
    setLocalizacao("");
  };

  const todosPosts = [
    ...(postsExemplo.map(p => ({
      text: p.texto, category: p.categoria, media: p.midia, location: p.localizacao
    })) || []),
    ...(posts || [])
  ];

  const jogosPassandoPosts =
    todosPosts.filter((p) => p.category === "Jogo Passando!") || [];

  return (
    <div className="grid-cols-3 md:col-span-3 space-y-6">
      <Sidebarleft
        jogosPosts={jogosPassandoPosts}
        className="hidden xl:block border rounded-lg w-64 fixed top-32 left-0 overflow-y-auto"
      />

      <div className="space-y-6 md:ml-40 p-2 mb-15">
        <div className="bg-[#b51890ff] p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-3 text-white">Criar post</h2>

          <textarea
            value={textoPost}
            onChange={(e) => setTextoPost(e.target.value)}
            onFocus={() => !autenticado && exigirAutenticacao()}
            className="bg-[#e58fb7] w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            placeholder="O que está rolando?"
          />

          <div className="flex flex-wrap gap-2">
            {["Jogo Passando!", "Quero companhia!", "Tem promoção!", "Vídeo Highlight!"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (!exigirAutenticacao()) return;
                  setCategoria(cat);
                }}
                className={`px-4 py-2 rounded-lg ${
                  categoria === cat
                    ? "bg-pink-600 text-white"
                    : "bg-pink-100 text-gray-800 hover:bg-pink-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <textarea
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              onFocus={() => !autenticado && exigirAutenticacao()}
              className="bg-[#e58fb7] w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="1"
              placeholder="Localização"
            />

            <button
              onClick={publicar}
              className="bg-pink-100 text-black px-4 py-2 rounded-lg hover:bg-pink-300"
            >
              Postar
            </button>

            <input
              type="file"
              className="hidden"
              id="arquivoInput"
              accept="image/*, video/*"
              onChange={(e) => {
                if (!exigirAutenticacao()) return;
                const arquivo = e.target.files[0];
                if (arquivo) setMidia(URL.createObjectURL(arquivo));
              }}
            />
            <label
              htmlFor="arquivoInput"
              onClick={(e) => {
                if (!exigirAutenticacao()) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              className="bg-pink-100 text-black px-4 py-2 rounded-lg hover:bg-pink-300 cursor-pointer"
            >
              Adicionar Foto/Vídeo
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {todosPosts.map((post, index) => (
            <div key={index} className="bg-[#e58fb7] p-4 rounded-2xl shadow text-pink-800">
              <span className="text-sm text-white">{post.category}</span>
              <p className="mt-1">{post.text}</p>
              <p className="mt-1 text-red-500">📍{post.location}</p>

              {post.media &&
                (post.media.includes("video") ? (
                  <video src={post.media} controls className="mt-2 rounded-lg w-full" />
                ) : (
                  <img
                    src={post.media}
                    alt="Post media"
                    className="mt-2 max-w-xs max-h-60 object-cover rounded-lg"
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}