import { useEffect } from "react";
import { X } from "lucide-react"; // ili samo "×" kao string ako ne koristiš ikone

const SportModal = ({ isOpen, onClose, sport, details }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-gray-800"
        onClick={(e) => e.stopPropagation()} // spriječi zatvaranje kad se klikne unutar modala
      >
        {/* X dugme */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Zatvori modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sadržaj modala */}
        <h2 className="text-xl font-bold mb-4">{sport}</h2>
        <p><strong>Maks. članova:</strong> {details.maxClanovi}</p>
        <p><strong>Voditelj:</strong> {details.voditelj}</p>
        {details.opis && (
          <p className="mt-2 text-sm text-gray-600">{details.opis}</p>
        )}
      </div>
    </div>
  );
};

export default SportModal;
