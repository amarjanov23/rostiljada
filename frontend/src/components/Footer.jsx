import React from 'react';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.avif';
import logo3 from '../assets/logo3.jpg';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.jpg';
import logo6 from '../assets/logo6.jpeg';
import logo7 from '../assets/logo7.png';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = ({ theme }) => {
  return (
    <footer className={`w-full ${theme.bg} ${theme.text} border-t ${theme.border} mt-10`}>
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-6">
        
        {/* Tekst + Mreže */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Studentski zbor · FOI · Sva prava pridržana
          </p>

          <div className="flex gap-5 items-center">
            <a
              href="https://www.instagram.com/sz_foi/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/SZborFOI/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.youtube.com/@szfoi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Logotipi */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4 border-t border-gray-300 w-full">
          {[logo1, logo2, logo3, logo4, logo5, logo6, logo7].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Logo ${index + 1}`}
              className="h-12 md:h-16 object-contain"
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4 border-t border-gray-300 w-full">
  <a
    href="mailto:adam.marjanovic2@gmail.com"
    className="text-sm text-center md:text-left text-blue-600 hover:underline"
  >
    Korisnička podrška: adam.marjanovic2@gmail.com
  </a>
</div>

      </div>
    </footer>
  );
};

export default Footer;
