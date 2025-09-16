import Footer from "../components/Footer.jsx";
import Explorar from "../components/Explorar.jsx";

export default function ExplorarPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                <Explorar />
            </div>
        </div>
    );
}