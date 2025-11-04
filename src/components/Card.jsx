import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Perfil from "../pages/perfil.jsx";
import Sidebarleft from "./Sidebar.jsx";

export default function Card() {
  const [textoPost, setTextoPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [midia, setMidia] = useState(null);
  const [localizacao, setLocalizacao] = useState("");
  const [restantes, setRestantes] = useState(280);
  const [username, setUsername] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [mensagensEnviadas, setMensagensEnviadas] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);


  const navegar = useNavigate();
  const rota = useLocation();

  const isAuthed = () => {
    try {
      const raw = localStorage.getItem("userdata");
      if (!raw) return false;
      const u = JSON.parse(raw);
      return !!(u?.username?.trim() || u?.email?.trim());
    } catch {
      return false;
    }
  };

  const exigirAutenticacao = () => {
    if (!isAuthed()) {
      navegar("/login", { state: { from: rota }, replace: true });
      return false;
    }
    return true;
  };

  const CATEGORIAS = ["Jogo Passando!", "Quero companhia!", "Tem promoção!", "Vídeo Highlight!"];
  const MAX_CHARS = 280;

  const postsExemplo = [
    {
      text: "Galera, vai passar Real Madrid x Juventus às 19h no salão da Sheila — apareçam!",
      category: "Jogo Passando!",
      media: null,
      location: "Salão da Sheila",
    },
    {
      text: "Alguém pra marcar um jogo no sábado?",
      category: "Quero companhia!",
      media: { src: "https://img.freepik.com/fotos-gratis/mulher-jogando-bola-para-cima_23-2148634558.jpg", type: "image" },
      location: "Região da Vila Matilde",
    },
    {
      text: "Promoção: 50% no Chop do Bar do seu Zé só para quem usa o App!",
      category: "Tem promoção!",
      media: null,
      location: "Bar do Seu Zé",
    },
  ];

  useEffect(() => {
    const raw = localStorage.getItem("userdata");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setUsername(u?.username || u?.email || "Visitante");
      } catch {
        setUsername("Visitante");
      }
    }
  }, []);

  useEffect(() => {
    const salvos = localStorage.getItem("posts");
    if (salvos) {
      try {
        const parsed = JSON.parse(salvos);
        if (Array.isArray(parsed)) setPosts(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const msgsSalvas = localStorage.getItem("mensagensEnviadas");
    if (msgsSalvas) {
      setMensagensEnviadas(JSON.parse(msgsSalvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mensagensEnviadas", JSON.stringify(mensagensEnviadas));
  }, [mensagensEnviadas]);

  useEffect(() => {
    setRestantes(MAX_CHARS - textoPost.length);
  }, [textoPost]);

  useEffect(() => {
    return () => {
      if (midia?.src?.startsWith("blob:")) URL.revokeObjectURL(midia.src);
    };
  }, [midia]);

  const publicar = () => {
    if (!exigirAutenticacao()) return;
    if (!textoPost.trim() || !categoria) return;

    const novo = {
      text: textoPost.trim(),
      category: categoria,
      media: midia,
      location: localizacao.trim(),
      createdAt: Date.now(),
      autor: username,
    };
    setPosts([novo, ...posts]);
    setTextoPost("");
    setCategoria("");
    setMidia(null);
    setLocalizacao("");
    setRestantes(MAX_CHARS);
  };

  const onEscolherArquivo = (e) => {
    if (!exigirAutenticacao()) {
      e.target.value = "";
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;
    const src = URL.createObjectURL(file);
    const type = file.type?.startsWith("video") ? "video" : "image";
    setMidia({ src, type });
  };

  const limparMidia = () => {
    if (midia?.src?.startsWith("blob:")) URL.revokeObjectURL(midia.src);
    setMidia(null);
  };

  const todosPosts = [...postsExemplo, ...posts];
  const jogosPassandoPosts = todosPosts.filter((p) => p.category === "Jogo Passando!");

  const handleEnviarMensagem = (index) => {
    if (!mensagem.trim()) return;
    setMensagensEnviadas((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), { texto: mensagem, data: new Date().toLocaleTimeString() }],
    }));
    setMensagem("");
    setReplyingTo(null);
  };

  return (
    <div className="grid-cols-3 md:col-span-3 space-y-6">
      <Sidebarleft
        jogosPosts={jogosPassandoPosts}
        className="hidden xl:block border rounded-2xl w-72 fixed top-28 left-0 overflow-y-auto bg-white/80 backdrop-blur-sm shadow-sm"
      />

      <div className="space-y-6 xl:ml-80 p-2 md:p-4 mb-[3.75rem] max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-4xl font-bold text-pink-600 drop-shadow-lg hover:scale-x-105 transition-transform duration-300 ease-out">
            Bem-vindo(a) ao Feed!
          </p>
          <p>
            Aqui você, {username}, pode postar o que quiser e também pode encontrar quem quiser!
          </p>
        </div>

        {/* Área de post */}
        <div className="rounded-2xl shadow-lg border border-black/10 bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-[#F24B99] via-[#C71C8D] to-[#B70088] p-4">
            <h2 className="text-white text-lg font-semibold">Compartilhe com a comunidade</h2>
            <p className="text-white/90 text-sm">Poste um convite, promoção, highlight ou o que está rolando agora.</p>
          </div>

          <div className="p-4 space-y-4">
            <textarea
              value={textoPost}
              onChange={(e) => setTextoPost(e.target.value.slice(0, MAX_CHARS))}
              onFocus={exigirAutenticacao}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F24B99]"
              rows={3}
              placeholder="O que está rolando?"
            />

            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => {
                const ativa = categoria === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      if (!exigirAutenticacao()) return;
                      setCategoria(cat);
                    }}
                    className={[
                      "px-3 py-1.5 rounded-full text-sm transition",
                      ativa
                        ? "bg-[#F24B99] text-white shadow hover:bg-[#91305d]"
                        : "bg-pink-100 text-pink-900 hover:bg-pink-200 border border-pink-200",
                    ].join(" ")}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                onFocus={exigirAutenticacao}
                className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F24B99]"
                placeholder="📍 Localização (opcional)"
              />

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="arquivoInput"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={onEscolherArquivo}
                />
                <label
                  htmlFor="arquivoInput"
                  onClick={(e) => {
                    if (!exigirAutenticacao()) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                  className="cursor-pointer px-3 py-2 rounded-lg border border-gray-300 text-slate-700 hover:bg-slate-50 transition"
                >
                  ➕ Mídia
                </label>

                <button
                  onClick={publicar}
                  className="px-4 py-2 rounded-lg bg-[#F24B99] text-white font-semibold shadow hover:bg-[#91305d] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!textoPost.trim() || !categoria}
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Listagem de posts */}
        <div className="space-y-4">
          {todosPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white border border-black/10 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-900">
                  {post.category}
                </span>
                {post.location && <span className="text-xs text-slate-500">📍 {post.location}</span>}
              </div>

              <p className="px-4 mt-2 text-slate-800 leading-relaxed">{post.text}</p>

              {post.media && (
                <div className="mt-3">
                  {post.media.type === "video" ? (
                    <video src={post.media.src} controls className="w-full max-h-[480px] object-cover" />
                  ) : (
                    <img src={post.media.src} alt="Post media" className="w-full max-h-[480px] object-cover" />
                  )}
                </div>
              )}

              <div className="px-4 py-3 flex items-center gap-3 border-t border-black/5">
                <button
                      onClick={() => {
                        if (!exigirAutenticacao()) return;
                        setLikedPosts((prev) =>
                          prev.includes(index)
                            ? prev.filter((i) => i !== index)
                            : [...prev, index]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition ${
                        likedPosts.includes(index)
                          ? "bg-red-500 text-white"
                          : "bg-slate-100 hover:bg-slate-200"
                      }`}
                      title="Curtir (requer login)"
                    >
                      ❤️ Curtir
                </button>
                <button
                  onClick={() => {
                    if (!exigirAutenticacao()) return;
                    setReplyingTo(replyingTo === index ? null : index);
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                >
                  💬 Mandar mensagem
                </button>
                <button
                  onClick={exigirAutenticacao}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                >
                  ↗️ Compartilhar
                </button>
              </div>

              {replyingTo === index && (
                <div className="px-4 pb-4 flex gap-2">
                  <input
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-full focus:ring-2 focus:ring-pink-400"
                    placeholder={`Mensagem para ${post.autor || "usuário"}...`}
                  />
                  <button
                    onClick={() => handleEnviarMensagem(index)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                  >
                    Enviar
                  </button>
                </div>
              )}

              {mensagensEnviadas[index]?.length > 0 && (
                <div className="px-4 pb-3 space-y-1">
                  {mensagensEnviadas[index].map((m, i) => (
                    <div
                      key={i}
                      className="bg-pink-50 border border-pink-200 text-sm rounded-xl px-3 py-2"
                    >
                      <span className="font-medium text-pink-700">Você:</span> {m.texto}
                      <span className="text-xs text-gray-400 ml-2">{m.data}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
