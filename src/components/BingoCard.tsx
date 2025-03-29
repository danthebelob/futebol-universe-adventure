
import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, Flag } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Player, fetchPlayers } from '@/utils/playerUtils';
import PlayerCard from './PlayerCard';

interface BingoCell {
  id: string;
  value: string;
  marked: boolean;
  isCorrect: boolean | null;
}

interface BingoCardProps {
  onBingo?: () => void;
}

const BingoCard: React.FC<BingoCardProps> = ({ onBingo }) => {
  const [cells, setCells] = useState<BingoCell[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersQueue, setPlayersQueue] = useState<Player[]>([]);
  const [remainingPlayers, setRemainingPlayers] = useState(0);
  const [markedCells, setMarkedCells] = useState(0);
  const [totalCells, setTotalCells] = useState(25);
  const [hasWon, setHasWon] = useState(false);

  const categories = [
    'Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Bayern de Munique', 
    'Borussia Dortmund', 'Bayer Leverkusen', 'Arsenal', 'Tottenham', 
    'Chelsea', 'Manchester City', 'Manchester United', 'Liverpool', 
    'Juventus', 'Milan', 'Inter de Milão', 'PSG', 'Lyon',
    'Brasil', 'Argentina', 'Colombia', 'Uruguai', 'Inglaterra', 
    'Holanda', 'Alemanha', 'Italia', 'Espanha', 'França'
  ];

  // Carregar jogadores
  useEffect(() => {
    const loadAllPlayers = async () => {
      try {
        const fetchedPlayers = await fetchPlayers();
        setPlayers(fetchedPlayers);
        
        // Criar uma fila de jogadores em ordem aleatória
        const shuffled = [...fetchedPlayers].sort(() => 0.5 - Math.random());
        setPlayersQueue(shuffled);
        setRemainingPlayers(shuffled.length);
      } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os jogadores.",
          variant: "destructive"
        });
      }
    };
    
    loadAllPlayers();
  }, []);

  // Gerar células do cartão de bingo
  useEffect(() => {
    generateBingoCard();
  }, []);

  // Chamar próximo jogador
  useEffect(() => {
    if (hasWon || playersQueue.length === 0) return;
    
    const timer = setTimeout(() => {
      callNextPlayer();
    }, 10000); // Mostra o jogador por 10 segundos
    
    return () => clearTimeout(timer);
  }, [currentPlayer, playersQueue, hasWon]);

  // Verificar vitória
  useEffect(() => {
    if (hasWon) return;
    
    // Verificar se todas as células foram marcadas
    if (markedCells >= totalCells) {
      setHasWon(true);
      toast({
        title: "BINGO!",
        description: "Parabéns! Você completou toda a cartela!",
      });
      if (onBingo) onBingo();
    }
  }, [markedCells, totalCells, hasWon, onBingo]);

  const generateBingoCard = () => {
    // Selecionar 25 categorias aleatoriamente (5x5)
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random()).slice(0, 25);
    
    const newCard: BingoCell[][] = [];
    
    // Criar um grid 5x5
    for (let i = 0; i < 5; i++) {
      const row: BingoCell[] = [];
      
      for (let j = 0; j < 5; j++) {
        const index = i * 5 + j;
        
        row.push({
          id: `cell-${i}-${j}`,
          value: shuffledCategories[index],
          marked: false,
          isCorrect: null
        });
      }
      
      newCard.push(row);
    }
    
    setCells(newCard);
    setMarkedCells(0);
    setTotalCells(25);
  };

  const callNextPlayer = () => {
    if (playersQueue.length === 0) {
      toast({
        title: "Fim de jogo",
        description: "Todos os jogadores foram mostrados.",
      });
      return;
    }
    
    // Pegar o próximo jogador da fila
    const nextPlayer = playersQueue[0];
    setCurrentPlayer(nextPlayer);
    setPlayersQueue(prev => prev.slice(1));
    setRemainingPlayers(prev => prev - 1);
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    if (!currentPlayer || hasWon) return;
    
    const cell = cells[rowIndex][cellIndex];
    
    // Não permitir clicar em células já marcadas
    if (cell.marked) return;
    
    // Verificar se este time/categoria está associado ao jogador atual
    const isCorrect = currentPlayer.teams.includes(cell.value);
    
    setCells(prevCells => {
      const newCells = [...prevCells];
      newCells[rowIndex][cellIndex] = {
        ...cell,
        marked: true,
        isCorrect: isCorrect
      };
      return newCells;
    });
    
    if (isCorrect) {
      // Aumentar o contador de células marcadas
      setMarkedCells(prev => prev + 1);
      toast({
        title: "Correto!",
        description: `${currentPlayer.name} jogou no ${cell.value}!`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Incorreto!",
        description: `${currentPlayer.name} não jogou no ${cell.value}.`,
        variant: "destructive",
        duration: 2000,
      });
    }
    
    // Avançar para o próximo jogador
    setTimeout(callNextPlayer, 1500);
  };

  // Função para determinar o ícone de nacionalidade
  const getNationalityFlag = (nationality: string) => {
    const flagCodes: {[key: string]: string} = {
      'Brasil': '🇧🇷',
      'Argentina': '🇦🇷',
      'Colombia': '🇨🇴',
      'Uruguai': '🇺🇾',
      'Inglaterra': '🇬🇧',
      'Holanda': '🇳🇱',
      'Alemanha': '🇩🇪',
      'Italia': '🇮🇹',
      'Espanha': '🇪🇸',
      'França': '🇫🇷',
      'Portugal': '🇵🇹',
      'Bélgica': '🇧🇪',
      'Polônia': '🇵🇱',
      'Egito': '🇪🇬',
      'Noruega': '🇳🇴'
    };
    
    return flagCodes[nationality] || <Flag size={16} />;
  };

  return (
    <div className="max-w-lg mx-auto">
      {currentPlayer && (
        <div className="bg-purple-800 text-white p-4 mb-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white text-purple-900 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                {remainingPlayers}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-bold text-xl uppercase">{currentPlayer.name}</h3>
                  <span className="ml-2">{getNationalityFlag(currentPlayer.nationality)}</span>
                </div>
                <p className="text-sm opacity-80">
                  {currentPlayer.club}
                </p>
              </div>
            </div>
            <PlayerCard 
              id={currentPlayer.id}
              name={currentPlayer.name}
              position={currentPlayer.position}
              nationality={currentPlayer.nationality}
              club={currentPlayer.club}
              overall={currentPlayer.overall}
              attack={currentPlayer.attack}
              defense={currentPlayer.defense}
              imageSrc={currentPlayer.imageSrc}
              rarity={currentPlayer.rarity}
            />
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-xl shadow-lg p-4 border-4 border-indigo-500">
        <div className="text-center mb-4 text-white">
          <h2 className="text-2xl font-heading font-bold text-white">
            BINGO FUTEBOL
          </h2>
          <p className="text-sm">Progresso: {markedCells}/{totalCells} células</p>
        </div>
        
        <div className="grid grid-cols-5 gap-1">
          {cells.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
              <div
                key={cell.id}
                className={`
                  flex flex-col items-center justify-center text-xs sm:text-sm cursor-pointer
                  ${cell.marked ? 
                    (cell.isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white') : 
                    'bg-gray-700 text-white hover:bg-gray-600'
                  }
                  p-2 rounded-md relative aspect-square
                `}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                <span className="text-center">{cell.value}</span>
                
                {cell.marked && (
                  <div className="absolute top-0 right-0 p-1">
                    {cell.isCorrect ? (
                      <CheckCircle2 size={16} className="text-green-300" />
                    ) : (
                      <X size={16} className="text-red-300" />
                    )}
                  </div>
                )}
              </div>
            ))
          ))}
        </div>
        
        {hasWon && (
          <div className="mt-4 p-2 bg-yellow-400 text-yellow-900 border border-yellow-600 rounded-md text-center animated-bounce">
            <p className="font-bold">BINGO! Parabéns!</p>
            <p className="text-sm">Você ganhou 50 moedas e uma carta rara!</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between">
        <button 
          onClick={generateBingoCard} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
        >
          Nova Cartela
        </button>
        
        <button 
          onClick={callNextPlayer} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Próximo Jogador
        </button>
      </div>
    </div>
  );
};

export default BingoCard;
