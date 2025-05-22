import logo from '../assets/icon.png';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.avif';
import logo3 from '../assets/logo3.jpg';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.jpg';
import logo6 from '../assets/logo6.jpeg';
import logo7 from '../assets/logo7.png';


const IntroOverlay = ({ theme, fadeOut, onClick }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: theme.bgOverlay,
      transition: 'opacity 0.7s ease-in-out',
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}
    className="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div className="cursor-pointer flex flex-col items-center text-center px-6">
      <img
        src={logo}
        alt="Logo"
        className="w-40 md:w-64 h-auto mb-6 drop-shadow-lg"
      />

      <h1
        style={theme.label}
        className="text-3xl md:text-5xl font-extrabold leading-tight"
      >
        Studentska Roštiljada 2025
      </h1>

      <p className="text-xl md:text-2xl font-medium mt-4" style={theme.label}>
        28. i 29.5. – Prijavi svoj tim!
      </p>

      <p className="mt-6 text-sm opacity-70" style={theme.label}>
        Klikni bilo gdje za nastavak
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
  {[logo1, logo2, logo3, logo4, logo5, logo6, logo7].map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`Logo ${index + 1}`}
      className="h-12 md:h-16 object-contain"
    />
  ))}
</div>

    </div>
  </div>
);

export default IntroOverlay;
