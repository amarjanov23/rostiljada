import logo from '../assets/icon.png';

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
    </div>
  </div>
);

export default IntroOverlay;
