
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PlayerCard from './PlayerCard';

interface CardPackProps {
  type: 'basic' | 'premium' | 'legendary';
  price: number;
  cardCount: number;
  guaranteedRarity?: 'rare' | 'epic' | 'legendary';
}

const mockPlayers = [
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
  },
  {
    id: 'p7',
    name: 'Van Dijk',
    position: 'ZAG',
    nationality: 'Holanda',
    club: 'Liverpool',
    overall: 88,
    attack: 55,
    defense: 90,
    rarity: 'rare' as const
  },
  {
    id: 'p8',
    name: 'Bruno Fernandes',
    position: 'MEI',
    nationality: 'Portugal',
    club: 'Man United',
    overall: 86,
    attack: 85,
    defense: 68,
    rarity: 'rare' as const
  },
  {
    id: 'p9',
    name: 'Rúben Dias',
    position: 'ZAG',
    nationality: 'Portugal',
    club: 'Man City',
    overall: 87,
    attack: 50,
    defense: 88,
    rarity: 'common' as const
  },
  {
    id: 'p10',
    name: 'Luis Díaz',
    position: 'PE',
    nationality: 'Colômbia',
    club: 'Liverpool',
    overall: 84,
    attack: 86,
    defense: 40,
    rarity: 'common' as const
  }
];

const CardPack: React.FC<CardPackProps> = ({
  type,
  price,
  cardCount,
  guaranteedRarity
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  
  const packStyles = {
    basic: {
      bg: 'bg-gradient-to-br from-gray-100 to-gray-300',
      border: 'border-gray-400',
      title: 'Pacote Básico',
      desc: 'Contém jogadores comuns e chance de raros'
    },
    premium: {
      bg: 'bg-gradient-to-br from-fu-blue-100 to-fu-blue-300',
      border: 'border-fu-blue-500',
      title: 'Pacote Premium',
      desc: 'Garante pelo menos uma carta rara'
    },
    legendary: {
      bg: 'bg-gradient-to-br from-fu-gold-100 to-fu-gold-400',
      border: 'border-fu-gold-600',
      title: 'Pacote Lendário',
      desc: 'Garante pelo menos uma carta épica'
    }
  };
  
  const style = packStyles[type];
  
  const getRandomCards = () => {
    // Lógica para selecionar cartas baseado no tipo de pacote
    let newCards = [];
    
    // Primeiro garantimos a carta de raridade prometida
    if (guaranteedRarity) {
      const eligibleCards = mockPlayers.filter(p => p.rarity === guaranteedRarity);
      if (eligibleCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleCards.length);
        newCards.push(eligibleCards[randomIndex]);
      }
    }
    
    // Completamos o resto do pacote
    while (newCards.length < cardCount) {
      let rarityChance = Math.random();
      let eligibleCards;
      
      if (type === 'basic') {
        if (rarityChance < 0.8) {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'common');
        } else {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'rare');
        }
      } else if (type === 'premium') {
        if (rarityChance < 0.6) {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'common');
        } else if (rarityChance < 0.9) {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'rare');
        } else {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'epic');
        }
      } else {  // legendary
        if (rarityChance < 0.4) {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'rare');
        } else if (rarityChance < 0.8) {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'epic');
        } else {
          eligibleCards = mockPlayers.filter(p => p.rarity === 'legendary');
        }
      }
      
      if (eligibleCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleCards.length);
        // Evitar cartas duplicadas
        if (!newCards.find(c => c.id === eligibleCards[randomIndex].id)) {
          newCards.push(eligibleCards[randomIndex]);
        }
      }
    }
    
    // Embaralhar as cartas
    return newCards.sort(() => Math.random() - 0.5);
  };
  
  const handleOpenPack = () => {
    // Verificar se o usuário tem moedas suficientes
    toast({
      title: "Comprando pacote",
      description: `Você gastou ${price} moedas para comprar este pacote.`,
    });
    
    const newCards = getRandomCards();
    setCards(newCards);
    setRevealedCount(0);
    setIsRevealing(true);
    
    // Simular a revelação de cartas uma a uma
    const interval = setInterval(() => {
      setRevealedCount(prev => {
        const next = prev + 1;
        if (next >= newCards.length) {
          clearInterval(interval);
          setIsRevealing(false);
          return newCards.length;
        }
        return next;
      });
    }, 800);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`${style.bg} ${style.border} border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 text-center`}>
          <div className="relative">
            <img 
              src={`/images/${type}-pack.png`}
              alt={`${style.title}`}
              className="w-full h-auto object-contain mx-auto"
              onError={(e) => {
                // Fallback se a imagem não existir
                (e.target as HTMLImageElement).src = '/images/pack-placeholder.png';
              }}
            />
            <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs font-bold">
              {cardCount}
            </div>
          </div>
          
          <h3 className="font-heading font-bold mt-3">{style.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{style.desc}</p>
          
          <div className="mt-3 flex items-center justify-center gap-1 font-bold">
            <Sparkles size={16} className="text-fu-gold-500" />
            <span>{price}</span>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <div className="text-center mb-4">
          <h3 className="font-heading text-xl font-bold">Abrindo {style.title}</h3>
          <p className="text-sm text-gray-600">Veja quais jogadores você conseguiu!</p>
        </div>
        
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className={cn(
              style.bg,
              style.border,
              "border-2 w-48 h-64 rounded-lg flex items-center justify-center",
              "cursor-pointer hover:shadow-lg transition-all duration-300 animate-pulse"
            )}>
              <Sparkles size={40} className="text-white/80" />
            </div>
            <button 
              onClick={handleOpenPack}
              className="mt-6 bg-fu-green-600 hover:bg-fu-green-700 text-white font-medium px-6 py-2 rounded-md"
            >
              Abrir Pacote ({price} moedas)
            </button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
              {cards.map((card, index) => (
                <div key={card.id} className={cn(
                  "transition-all duration-500",
                  index >= revealedCount && "opacity-0 scale-75"
                )}>
                  <PlayerCard
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
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              {isRevealing ? (
                <p>Revelando cartas... {revealedCount}/{cards.length}</p>
              ) : (
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-fu-blue-600 hover:bg-fu-blue-700 text-white font-medium px-6 py-2 rounded-md"
                >
                  Continuar
                </button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CardPack;
