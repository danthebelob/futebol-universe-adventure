
import React, { useState } from 'react';
import { ArrowLeft, Info, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BingoCard from '@/components/BingoCard';
import { toast } from "@/hooks/use-toast";

const BingoGamePage: React.FC = () => {
  const [wins, setWins] = useState(0);
  const [games, setGames] = useState(0);
  
  const handleBingoWin = () => {
    setWins(prev => prev + 1);
    
    // Simular ganho de recompensas
    toast({
      title: "Parabéns! Você ganhou:",
      description: "50 moedas e 1 Pacote Básico de Cartas",
      duration: 5000,
    });
  };
  
  const startNewGame = () => {
    setGames(prev => prev + 1);
    toast({
      title: "Nova Partida",
      description: "Uma nova cartela de bingo foi gerada!",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-fu-blue-700 text-white py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center mb-4">
              <Link to="/jogos" className="mr-4 hover:text-fu-blue-200">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">Bingo de Futebol</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-2 text-fu-blue-200 hover:text-white">
                      <Info size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Marque os nomes dos jogadores anunciados em sua cartela. Complete uma linha, coluna ou diagonal para vencer!
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>Novo item a cada 5 segundos</span>
              </div>
              <div className="flex items-center">
                <Trophy size={16} className="mr-1" />
                <span>Vitórias: {wins}/{games}</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="font-heading font-bold text-lg text-center text-fu-blue-800 mb-2">
                  Aguarde o anúncio dos jogadores e marque-os em sua cartela
                </h2>
                <p className="text-center text-gray-600 text-sm">
                  Complete uma linha, coluna ou diagonal para vencer!
                </p>
              </div>
              
              <BingoCard onBingo={handleBingoWin} />
              
              <div className="mt-8 border-t border-gray-200 pt-4">
                <div className="text-center">
                  <h3 className="font-heading font-bold text-fu-blue-700">Recompensas por Vitória</h3>
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-fu-gold-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-xs">50</span>
                      </div>
                      <span className="text-sm">Moedas</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-fu-blue-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-xs">1</span>
                      </div>
                      <span className="text-sm">Carta Rara</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BingoGamePage;
