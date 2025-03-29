
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';

const GamesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-fu-green-700 text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Jogos</h1>
            <p className="text-lg">Escolha entre nossa seleção de mini-jogos temáticos de futebol.</p>
          </div>
        </section>
        
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Buscar jogos..." 
                  className="pl-10" 
                />
              </div>
              
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
                <Button variant="outline" className="rounded-full">Todos</Button>
                <Button variant="outline" className="rounded-full">Populares</Button>
                <Button variant="outline" className="rounded-full">Novos</Button>
                <Button variant="outline" className="rounded-full">Cartas</Button>
                <Button variant="outline" className="rounded-full">Coleção</Button>
                <Button variant="outline" className="rounded-full">Quiz</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <GameCard 
                id="bingo"
                title="Bingo de Futebol"
                description="Marque os nomes dos jogadores em sua cartela e complete linhas para vencer!"
                imagePath="/images/bingo-game.jpg"
                isNew={true}
                route="/jogos/bingo"
              />
              
              <GameCard 
                id="battle"
                title="Batalha de Cartas"
                description="Monte seu deck e desafie outros jogadores em batalhas táticas!"
                imagePath="/images/card-battle.jpg"
                comingSoon={true}
                route="/jogos/batalha"
              />
              
              <GameCard 
                id="album"
                title="Álbum de Figurinhas"
                description="Colecione figurinhas digitais dos seus jogadores favoritos e complete álbuns temáticos."
                imagePath="/images/sticker-album.jpg"
                comingSoon={true}
                route="/jogos/album"
              />
              
              <GameCard 
                id="penalty"
                title="Penalty Shootout"
                description="Teste sua habilidade em cobranças de pênaltis contra outros jogadores em tempo real."
                imagePath="/images/penalty-game.jpg"
                comingSoon={true}
                route="/jogos/penalty"
              />
              
              <GameCard 
                id="quiz"
                title="Quiz da Bola"
                description="Teste seu conhecimento sobre futebol em perguntas sobre história, regras e curiosidades."
                imagePath="/images/quiz-game.jpg"
                comingSoon={true}
                route="/jogos/quiz"
              />
              
              <GameCard 
                id="fantasy"
                title="Fantasy League"
                description="Monte seu time virtual e ganhe pontos baseados no desempenho real dos jogadores."
                imagePath="/images/fantasy-game.jpg"
                comingSoon={true}
                route="/jogos/fantasy"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamesPage;
