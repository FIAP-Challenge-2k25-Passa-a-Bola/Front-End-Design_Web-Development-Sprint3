import { useEffect, useState } from "react";

export default function Explorar() {
  const [fakeUsers, setFakeUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setFakeUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  if (!fakeUsers.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Carregando usuários...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      {!selectedUser ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fakeUsers.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-pink-100 rounded shadow cursor-pointer hover:bg-pink-200"
              onClick={() => setSelectedUser(user)}
            >
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-700">{user.email}</p>
              <p className="text-sm text-gray-700">Preferências: null</p>
              <p className="text-sm text-gray-700">Time: null</p>
                <p className="text-sm text-gray-700">Região: null</p>

              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(
                  "Olá " + user.name
                )}&body=${encodeURIComponent(
                  "Vi seu perfil no Explorar e queria conversar..."
                )}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-block mt-2 px-3 py-1 text-sm bg-pink-300 rounded hover:bg-pink-400"
              >
                Enviar email
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-pink-100 rounded shadow">
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Voltar
          </button>
          <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {selectedUser.email}
          </p>
          <p>
            <span className="font-semibold">Empresa:</span>{" "}
            {selectedUser.company?.name}
          </p>
          <p>
            <span className="font-semibold">Cidade:</span>{" "}
            {selectedUser.address?.city}
          </p>

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
