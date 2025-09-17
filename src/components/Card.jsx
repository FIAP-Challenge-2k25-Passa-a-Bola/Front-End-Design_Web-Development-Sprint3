import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebarleft from "./Sidebar.jsx";

export default function Card() {
  const [textoPost, setTextoPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [midia, setMidia] = useState(null); // { src, type } | null
  const [localizacao, setLocalizacao] = useState("");
  const [restantes, setRestantes] = useState(280);

  const navegar = useNavigate();
  const rota = useLocation();

  // Checagem robusta de autenticação (username OU email)
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
      // impede o diálogo de arquivo
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

  return (
    <div className="grid-cols-3 md:col-span-3 space-y-6">
      <Sidebarleft
        jogosPosts={jogosPassandoPosts}
        className="hidden xl:block border rounded-2xl w-72 fixed top-28 left-0 overflow-y-auto bg-white/80 backdrop-blur-sm shadow-sm"
      />

      <div className="space-y-6 xl:ml-80 p-2 md:p-4 mb-[3.75rem] max-w-3xl mx-auto">
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
                    title={cat}
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
                  title="Adicionar Foto/Vídeo"
                >
                  ➕ Mídia
                </label>

                <button
                  onClick={publicar}
                  className="px-4 py-2 rounded-lg bg-[#F24B99] text-white font-semibold shadow hover:bg-[#91305d] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!textoPost.trim() || !categoria}
                  title={!textoPost.trim() || !categoria ? "Escreva algo e escolha uma categoria" : "Publicar"}
                >
                  Publicar
                </button>
              </div>
            </div>

            {midia && (
              <div className="relative mt-2 group">
                {midia.type === "video" ? (
                  <video src={midia.src} controls className="w-full rounded-xl" />
                ) : (
                  <img src={midia.src} alt="Pré-visualização" className="w-full max-h-96 object-cover rounded-xl" />
                )}
                <button
                  onClick={limparMidia}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  title="Remover mídia"
                >
                  Remover
                </button>
              </div>
            )}

            <div className="flex items-center justify-end">
              <span className={`text-sm ${restantes < 0 ? "text-red-600" : "text-slate-500"}`}>
                {restantes} caracteres
              </span>
            </div>
          </div>
        </div>

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
                  onClick={exigirAutenticacao}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                  title="Curtir (requer login)"
                >
                  ❤️ Curtir
                </button>
                <button
                  onClick={exigirAutenticacao}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                  title="Comentar (requer login)"
                >
                  💬 Comentar
                </button>
                <button
                  onClick={exigirAutenticacao}
                  className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 hover:bg-slate-200 transition"
                  title="Compartilhar (requer login)"
                >
                  ↗️ Compartilhar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
