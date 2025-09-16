import { useState } from "react";
export default function Conta() {
    const [username, setUsername] = useState("");
    const [email, setMail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSave = () => {
        const userdata = { username, email, senha };
        localStorage.setItem("userdata", JSON.stringify(userdata));
        alert("Dados salvos com sucesso!");
    }
  return (
    <main className="flex-col rounded-lg items-center fixed top-32 right-0 p-4 bg-[#e58fb7] text-white w-96 z-50 hidden xl:block itemns-center">
        <h1 className="text-4xl font-bold mb-8 text-pink-800 ">Minha Conta</h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Nome de Usuário</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900" value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder="Seu nome de usuário" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" value={email} onChange={(e) => setMail(e.target.value)} htmlFor="useremail">Email</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900" type="email" id="email" placeholder="
Seu email" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" value={senha} onChange={(e) => setSenha(e.target.value)} htmlFor="userpassword">Senha</label>
                <input className="w-full p-2 border border-gray-300 rounded-lg text-pink-900" type="password" id="password" placeholder="Sua senha" />
            </div>
            <button onClick={handleSave} className="w-full bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition duration-300">Salvar Alterações</button>
        </div>
    </main>
  );
}