export default function Sidebarleft({ jogosPosts = [], className }) {
  return (
    <div className={`bg-[#e58fb7] text-white p-4  ${className}`}>
            <h2 className="p-2 font-bold mb-4 ">🌍 Jogos passando por ai:</h2>

            <main className=" p-2 rounded-lg mb-2">
                {jogosPosts.length === 0 ? (
                <p className="text-gray-400">Nenhum jogo passando no momento.</p>
                ) : (
                jogosPosts.map((post, i) => (
                    <div key={i} className="bg-[#b51890ff] p-2 rounded-lg mb-2">
                    <p className="text-sm">{post.text}</p>
                    <span className="text-xs text-gray-300">{post.location}</span>
                    </div>
                ))
                )}
            </main>
          <h1>☝️ Poste um jogo passando!</h1>
    </div>
  );
}
