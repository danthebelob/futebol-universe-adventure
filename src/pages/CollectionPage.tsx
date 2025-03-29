
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlayerCard from '@/components/PlayerCard';
import CardPack from '@/components/CardPack';

const mockPlayerCards = [
  {
    id: 'p1',
    name: 'Lionel Messi',
    position: 'PE',
    nationality: 'Argentina',
    club: 'Inter Miami',
    overall: 90,
    attack: 92,
    defense: 38,
    rarity: 'legendary' as const
  },
  {
    id: 'p2',
    name: 'Cristiano Ronaldo',
    position: 'CA',
    nationality: 'Portugal',
    club: 'Al Nassr',
    overall: 88,
    attack: 90,
    defense: 35,
    rarity: 'legendary' as const
  },
  {
    id: 'p3',
    name: 'Neymar Jr',
    position: 'PE',
    nationality: 'Brasil',
    club: 'Al Hilal',
    overall: 87,
    attack: 89,
    defense: 30,
    rarity: 'epic' as const
  },
  {
    id: 'p4',
    name: 'Vini Jr',
    position: 'PE',
    nationality: 'Brasil',
    club: 'Real Madrid',
    overall: 89,
    attack: 91,
    defense: 28,
    rarity: 'epic' as const
  },
  {
    id: 'p5',
    name: 'Erling Haaland',
    position: 'CA',
    nationality: 'Noruega',
    club: 'Man City',
    overall: 91,
    attack: 94,
    defense: 45,
    rarity: 'epic' as const
  },
  {
    id: 'p6',
    name: 'Rodri',
    position: 'VOL',
    nationality: 'Espanha',
    club: 'Man City',
    overall: 89,
    attack: 77,
    defense: 85,
    rarity: 'rare' as const
  }
];

const CollectionPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredCards = filter === 'all' 
    ? mockPlayerCards 
    : mockPlayerCards.filter(card => card.rarity === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-fu-green-700 text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Minha Coleção</h1>
            <p className="text-lg">Gerencie suas cartas de jogadores e outros itens colecionáveis.</p>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="cards">Cartas</TabsTrigger>
                <TabsTrigger value="packs">Pacotes</TabsTrigger>
                <TabsTrigger value="albums">Álbuns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cards" className="p-4 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold mb-4">Minhas Cartas</h2>
                  <div className="flex overflow-x-auto gap-2 pb-2">
                    <button 
                      onClick={() => setFilter('all')}
                      className={`px-4 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-fu-green-600 text-white' : 'bg-gray-100'}`}
                    >
                      Todas
                    </button>
                    <button 
                      onClick={() => setFilter('common')}
                      className={`px-4 py-1 rounded-full text-sm ${filter === 'common' ? 'bg-gray-600 text-white' : 'bg-gray-100'}`}
                    >
                      Comuns
                    </button>
                    <button 
                      onClick={() => setFilter('rare')}
                      className={`px-4 py-1 rounded-full text-sm ${filter === 'rare' ? 'bg-fu-gold-500 text-white' : 'bg-gray-100'}`}
                    >
                      Raras
                    </button>
                    <button 
                      onClick={() => setFilter('epic')}
                      className={`px-4 py-1 rounded-full text-sm ${filter === 'epic' ? 'bg-fu-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                      Épicas
                    </button>
                    <button 
                      onClick={() => setFilter('legendary')}
                      className={`px-4 py-1 rounded-full text-sm ${filter === 'legendary' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                    >
                      Lendárias
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
                  {filteredCards.map(card => (
                    <PlayerCard
                      key={card.id}
                      id={card.id}
                      name={card.name}
                      position={card.position}
                      nationality={card.nationality}
                      club={card.club}
                      overall={card.overall}
                      attack={card.attack}
                      defense={card.defense}
                      rarity={card.rarity}
                    />
                  ))}
                </div>
                
                {filteredCards.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhuma carta encontrada com este filtro.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="packs" className="p-4 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold mb-4">Comprar Pacotes</h2>
                  <p className="text-gray-600">Adquira novos pacotes para expandir sua coleção de cartas.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <CardPack
                    type="basic"
                    price={100}
                    cardCount={3}
                  />
                  
                  <CardPack
                    type="premium"
                    price={250}
                    cardCount={5}
                    guaranteedRarity="rare"
                  />
                  
                  <CardPack
                    type="legendary"
                    price={500}
                    cardCount={5}
                    guaranteedRarity="epic"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="albums" className="p-4 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                  <h2 className="font-heading text-xl font-bold mb-4">Meus Álbuns</h2>
                  <p className="text-gray-600">Em desenvolvimento. Novos álbuns serão adicionados em breve!</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-gray-400">Álbuns em breve</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollectionPage;
