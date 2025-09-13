import { useEffect, useState } from "react";
import Sidebarleft from "./Sidebar.jsx";

export default function Card() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState(null);
  const [location, setLocation] = useState("");

  const samplePosts = [
    {
      text: "Galera, vai passar Real Madrid x Juventus às 19h no salão da Sheila — apareçam!",
      category: "Jogo Passando!",
      media: null,
      location: "Salão da Sheila",
    },
    {
      text: "Alguém pra marcar um jogo no sábado?",
      category: "Quero companhia!",
      media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U6IlU_7Z9QXLAlzqTn--VBLtEqvTZR--YA&s",
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
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (postText.trim() === "" || category === "") return;
    const newPost = { text: postText, category, media, location };
    setPosts([newPost, ...posts]);
    setPostText("");
    setCategory("");
    setMedia(null);
    setLocation("");
  };

  const allPosts = [...(samplePosts || []), ...(posts || [])];


  const jogosPassandoPosts =
    allPosts.filter((p) => p.category === "Jogo Passando!") || [];

  return (
    <div className="grid-cols-3 md:col-span-3 space-y-6">
      <Sidebarleft
        jogosPosts={jogosPassandoPosts}
        className="w-64 h-screen fixed top-0 left-0 overflow-y-auto"
      />

      <div className="space-y-6">
        <div className="bg-gray-600 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-3 text-white">Criar post</h2>

          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            placeholder="O que está rolando?"
          />

          <div className="flex flex-wrap gap-2 mb-3">
            {["Jogo Passando!", "Quero companhia!", "Tem promoção!", "Vídeo Highlight!"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg ${
                    category === cat
                      ? "bg-pink-600 text-white"
                      : "bg-pink-100 text-gray-800 hover:bg-pink-300"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <textarea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="1"
              placeholder="Localização"
            />
            <button
              onClick={handlePost}
              className="bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Postar
            </button>

            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept="image/*, video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setMedia(URL.createObjectURL(file));
              }}
            />
            <label
              htmlFor="fileInput"
              className="bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
            >
              Adicionar Foto/Vídeo
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {allPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-600 p-4 rounded-2xl shadow text-black"
            >
              <span className="text-sm text-gray-300">{post.category}</span>
              <p className="mt-1">{post.text}</p>
              <p className="mt-1 text-red-500">{post.location}</p>

              {post.media &&
                (post.media.includes("video") ? (
                  <video
                    src={post.media}
                    controls
                    className="mt-2 rounded-lg w-full"
                  />
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
