
import React from 'react';
import { Link } from 'react-router-dom';
import { Football, Trophy, PackagePlus, Users, Star } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import UserProfile from '@/components/UserProfile';

const Index: React.FC = () => {
  const handleLoginPrompt = () => {
    toast({
      title: "Função em desenvolvimento",
      description: "O sistema de login estará disponível em breve!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-fu-green-700 to-fu-green-900 text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  Bem-vindo ao Futebol Universe
                </h1>
                <p className="text-lg mb-6">
                  Uma plataforma interativa com múltiplos mini jogos temáticos de futebol. 
                  Crie seu perfil, colete itens exclusivos e compita com outros jogadores!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/jogos" className="btn-primary">
                    Jogar Agora
                  </Link>
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20" onClick={handleLoginPrompt}>
                    Criar Conta
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-fu-green-600 opacity-40 animate-pulse"></div>
                  <Football size={200} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* User Profile Preview */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <UserProfile 
              username="Jogador123"
              level={5}
              xp={1250}
              maxXp={2000}
              coins={350}
              wins={12}
              matches={20}
              cardsCollected={25}
              totalCards={100}
            />
          </div>
        </section>
        
        {/* Jogos Disponíveis */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">Jogos Disponíveis</h2>
              <p className="text-lg text-gray-600">Escolha um dos nossos mini-jogos e divirta-se!</p>
            </div>
            
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
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 px-4 bg-fu-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">Recursos</h2>
              <p className="text-lg text-gray-600">Descubra tudo o que o Futebol Universe tem a oferecer</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-fu-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy size={32} className="text-fu-green-600" />
                </div>
                <h3 className="font-heading font-bold mb-2">Conquistas</h3>
                <p className="text-gray-600">Ganhe troféus e distintivos por suas realizações no jogo.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-fu-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackagePlus size={32} className="text-fu-blue-600" />
                </div>
                <h3 className="font-heading font-bold mb-2">Itens Colecionáveis</h3>
                <p className="text-gray-600">Colecione cartas e figurinhas de jogadores lendários.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-fu-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={32} className="text-fu-gold-600" />
                </div>
                <h3 className="font-heading font-bold mb-2">Recompensas</h3>
                <p className="text-gray-600">Receba prêmios diários e complete missões para ganhar itens especiais.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-red-600" />
                </div>
                <h3 className="font-heading font-bold mb-2">Competição</h3>
                <p className="text-gray-600">Desafie seus amigos e dispute torneios online.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
