import { useEffect, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("https://68d33dafcc7017eec54652ba.mockapi.io/users");
        const data = await res.json();

        const frases = [
          "Gostei do seu lance, quer jogar no meu time?",
          "Estou na Vila Matilde, vamos jogar na quadra 55?",
          "Bora marcar um amistoso esse fim de semana?",
          "Adorei o post, jogo na mesma região que você!",
          "Topa participar de um campeonato local?",
          "Você joga muito! Bora montar um time?"
        ];

        const mensagens = data.slice(0, 6).map((user, i) => ({
          id: user.id,
          sender: user.name || "Jogador desconhecido",
          message: frases[i % frases.length],
          time: `${18 + i}:${(30 + i * 5) % 60}`.padStart(5, "0"),
          reply: null,
          userData: user,
        }));

        setMessages(mensagens);
      } catch (error) {
        console.error("Erro ao buscar API:", error);
      }
    }

    fetchMessages();
  }, []);

  const handleReplyClick = (id) => {
    setReplyingTo(id);
    setReplyText("");
  };

  const handleSendReply = (id) => {
    if (!replyText.trim()) return;

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, reply: replyText } : msg
      )
    );
    setReplyingTo(null);
    setReplyText("");
  };

  const handleViewProfile = (user) => {
    setSelectedProfile(user);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-16 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-pink-200 via-pink-100 to-white">
      <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">
        💬 Mensagens para você
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Veja o que o pessoal está mandando sobre seus posts!
      </p>

      <div className="space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 bg-white rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-pink-700">{msg.sender}</span>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
            <p className="text-gray-700">{msg.message}</p>

            {msg.reply && (
              <div className="mt-2 pl-3 border-l-4 border-pink-400 text-sm text-gray-600 italic">
                Sua resposta: {msg.reply}
              </div>
            )}

            {replyingTo === msg.id && (
              <div className="mt-3 flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Digite sua resposta..."
                  className="flex-1 px-3 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  onClick={() => handleSendReply(msg.id)}
                  className="px-4 py-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-sm rounded-full shadow hover:opacity-90 transition"
                >
                  Enviar
                </button>
              </div>
            )}

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleReplyClick(msg.id)}
                className="px-3 py-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white text-sm rounded-full shadow hover:opacity-90 transition"
              >
                Responder
              </button>
              <button
                onClick={() => handleViewProfile(msg.userData)}
                className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full hover:bg-gray-200 transition"
              >
                Ver perfil
              </button>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Nenhuma mensagem no momento 😢
        </p>
      )}

      {selectedProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full relative">
            <button
              onClick={handleCloseProfile}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-pink-700 mb-3">
              {selectedProfile.name}
            </h3>
            <p className="text-gray-700">
              <strong>Telefone:</strong> {selectedProfile.numero || "Não informado"}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {selectedProfile.email || "Não disponível"}
            </p>
            <p className="text-gray-700">
              <strong>Endereço:</strong>{" "}
              {selectedProfile.regiao || "Local não informado"}
            </p>
            <p className="text-gray-700 mt-2 text-sm italic">
              Jogador ativo da comunidade ⚽
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
