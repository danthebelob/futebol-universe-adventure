
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Futebol Universe. Todos os direitos reservados.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-fu-green-600 text-sm">Termos de Uso</a>
            <a href="#" className="text-gray-600 hover:text-fu-green-600 text-sm">Privacidade</a>
            <a href="#" className="text-gray-600 hover:text-fu-green-600 text-sm">Suporte</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
