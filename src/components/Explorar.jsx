import { useEffect, useState } from "react";

export default function Explorar() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://68d33dafcc7017eec54652ba.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  if (!users.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Carregando usuários..
      </p>
    );
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 mb-12">
      {!selectedUser ? (
        <>
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Buscar usuário por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-pink-100 rounded-2xl shadow hover:bg-pink-200 transition"
                  onClick={() => setSelectedUser(user)}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-pink-300"
                  />
                  <h3 className="font-bold text-lg text-center">{user.name}</h3>
                  <p className="text-sm text-gray-700 text-center">@{user.username}</p>
                  <p className="text-sm text-gray-700 mt-2 text-center">{user.email}</p>

                  <div className="mt-3 text-sm text-gray-700">
                    <p><strong>Lado do campo:</strong> {user.preferencies || "Não informado"}</p>
                    <p><strong>Região:</strong> {user.regiao || "Não informado"}</p>
                    <p><strong>Time:</strong> {user.time || "Não informado"}</p>
                  </div>

                  <a
                    href={`mailto:${user.email}?subject=${encodeURIComponent(
                      "Olá " + user.name
                    )}&body=${encodeURIComponent(
                      "Vi seu perfil no Explorar e queria conversar..."
                    )}`}
                    onClick={(e) => e.stopPropagation()}
                    className="block mt-3 text-center px-3 py-1 text-sm bg-pink-300 rounded hover:bg-pink-400"
                  >
                    Enviar email
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              Nenhum usuário encontrado com esse nome.
            </p>
          )}
        </>
      ) : (
        <div className="p-6 bg-pink-100 rounded shadow text-center">
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Voltar
          </button>

          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-pink-300"
          />
          <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>
          <p className="text-gray-700">@{selectedUser.username}</p>

          <div className="mt-4 text-left inline-block text-gray-700">
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Lado do campo:</strong> {selectedUser.preferencies}</p>
            <p><strong>Região:</strong> {selectedUser.regiao}</p>
            <p><strong>Time:</strong> {selectedUser.time}</p>
          </div>

          <a
            href={`mailto:${selectedUser.email}?subject=${encodeURIComponent(
              "Olá " + selectedUser.name
            )}&body=${encodeURIComponent(
              "Vi seu perfil no Explorar e queria conversar..."
            )}`}
            className="inline-block mt-4 px-4 py-2 bg-pink-300 rounded hover:bg-pink-400"
          >
            Enviar email para {selectedUser.name}
          </a>
        </div>
      )}
    </div>
  );
}
