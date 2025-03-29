
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Trophy, Settings, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => setIsOpen(!isOpen);

  const showLoginToast = () => {
    toast({
      title: "Função em desenvolvimento",
      description: "O sistema de login estará disponível em breve!",
    });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-fu-green-600 text-xl font-heading font-bold">Futebol Universe</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-fu-green-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-fu-green-600 transition-colors">Início</Link>
            <Link to="/jogos" className="text-gray-600 hover:text-fu-green-600 transition-colors">Jogos</Link>
            <Link to="/colecao" className="text-gray-600 hover:text-fu-green-600 transition-colors">Minha Coleção</Link>
            <Link to="/loja" className="text-gray-600 hover:text-fu-green-600 transition-colors">Loja</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/avatar-placeholder.png" />
                    <AvatarFallback className="bg-fu-green-500 text-white">FU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={showLoginToast}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={showLoginToast}>
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>Conquistas</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={showLoginToast}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={showLoginToast}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-600 hover:text-fu-green-600" onClick={toggleMenu}>Início</Link>
            <Link to="/jogos" className="block py-2 text-gray-600 hover:text-fu-green-600" onClick={toggleMenu}>Jogos</Link>
            <Link to="/colecao" className="block py-2 text-gray-600 hover:text-fu-green-600" onClick={toggleMenu}>Minha Coleção</Link>
            <Link to="/loja" className="block py-2 text-gray-600 hover:text-fu-green-600" onClick={toggleMenu}>Loja</Link>
            <button onClick={showLoginToast} className="block w-full text-left py-2 text-gray-600 hover:text-fu-green-600">
              Minha Conta
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
