import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-700 border-t border-gray-200 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Fakultet organizacije i informatike ·  Studentski zbor · Sva prava pridržana
        </p>

        <div className="flex gap-5 items-center">
          <a href="https://www.instagram.com/sz_foi/?hl=en" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
            <Instagram size={20} />
          </a>
          <a href="https://www.facebook.com/SZborFOI/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
            <Facebook size={20} />
          </a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
