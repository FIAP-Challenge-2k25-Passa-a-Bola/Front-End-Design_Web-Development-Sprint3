import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";

export default function Feed() {
    return (
    <div className="flex flex-col min-h-screen">
      {/* conteúdo principal */}
      <div className="flex-grow max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <Card />
      </div>

      {/* footer encostado no fim */}
      <Footer />
    </div>
    );
    }
