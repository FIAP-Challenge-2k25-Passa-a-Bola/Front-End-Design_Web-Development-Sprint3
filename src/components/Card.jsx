export default function Card() {
    return (      
    <div class="grid-cols-3 md:col-span-3 space-y-6">
        <div class="bg-pink-200 p-4 rounded-2xl shadow ">
          <h2 class="md:col-span-3 space-y-6">Criar post</h2>
          <textarea class="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500" rows="3" placeholder="O que está rolando?"></textarea>
            <div class="flex flex-wrap gap-2 mb-3">
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              <button class="border-1  text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 hover:text-green-200">Jogo passando</button>
              <button class="border-1  text-blue-600 px-4 py-2 rounded-lg hover:bg-pink-700 hover:text-green-200">Quero companhia</button>
              <button class="border-1  text-green-600 px-4 py-2 rounded-lg hover:bg-pink-700 hover:text-green-200">Promoção</button>
              <button class="border-1  text-yellow-600 px-4 py-2 rounded-lg hover:bg-pink-700 hover:text-green-200">Highlights</button>
            </div>
            <div class="gap-2 flex flex-wrap">
              <textarea class="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500" rows="1" placeholder="Localização"></textarea>
              <button class="bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-green-700">Postar</button>
              <input type="file" class="hidden" id="fileInput" />
              <button for="fileInput" class="bg-yellow-300 text-black px-4 py-2 rounded-lg hover:bg-green-700">Adicionar Foto/Vídeo</button>
            </div>

        </div>

      </div>
    );
    }