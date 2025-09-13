export default function Sidebarleft({ jogosPosts = [], className }) {
  return (
    <div className={`bg-gray-800 text-white p-4 fixed top-16 ${className}`}>
      <h2 className="text-lg font-bold mb-4">Jogos passando por ai:</h2>

      <main className="p-4 mt-3 space-y-4">
        {jogosPosts.length === 0 ? (
          <p className="text-gray-400">Nenhum jogo passando no momento.</p>
        ) : (
          jogosPosts.map((post, i) => (
            <div key={i} className="bg-gray-600 p-2 rounded-lg mb-2">
              <p className="text-sm">{post.text}</p>
              <span className="text-xs text-gray-300">{post.location}</span>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
