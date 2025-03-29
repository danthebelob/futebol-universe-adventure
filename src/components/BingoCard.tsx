
import React, { useState, useEffect } from 'react';
import { Football, CheckCircle2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface BingoCell {
  id: string;
  value: string;
  category: string;
  marked: boolean;
}

interface BingoCardProps {
  onBingo?: () => void;
}

const BingoCard: React.FC<BingoCardProps> = ({ onBingo }) => {
  const [cells, setCells] = useState<BingoCell[][]>([]);
  const [calledItems, setCalledItems] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);

  const categories = [
    'Seleção Brasileira',
    'Camisa 10',
    'Champions League',
    'Premier League',
    'Ballon d\'Or',
  ];

  const players = {
    'Seleção Brasileira': ['Neymar', 'Vini Jr', 'Ronaldo', 'Romário', 'Pelé', 'Ronaldinho', 'Kaká', 'Rivaldo', 'Zico', 'Cafu', 'Roberto Carlos', 'Taffarel', 'Thiago Silva', 'Casemiro', 'Marquinhos'],
    'Camisa 10': ['Pelé', 'Maradona', 'Messi', 'Neymar', 'Zidane', 'Ronaldinho', 'Totti', 'Del Piero', 'Kane', 'Hazard', 'Roberto Baggio', 'Rivaldo', 'James Rodriguez', 'Kaká', 'Mbappé'],
    'Champions League': ['C. Ronaldo', 'Messi', 'Benzema', 'Lewandowski', 'Haaland', 'Salah', 'Mbappé', 'De Bruyne', 'Vini Jr', 'Bellingham', 'Modric', 'Casemiro', 'Neuer', 'Van Dijk', 'Courtois'],
    'Premier League': ['Haaland', 'Salah', 'De Bruyne', 'Kane', 'Son', 'Bruno Fernandes', 'Rashford', 'Foden', 'Van Dijk', 'Saka', 'Martinelli', 'Rodri', 'Ederson', 'Rice', 'Luis Díaz'],
    'Ballon d\'Or': ['Messi', 'C. Ronaldo', 'Benzema', 'Modric', 'Lewandowski', 'Ronaldinho', 'Kaká', 'Rivaldo', 'Ronaldo', 'Zidane', 'Cannavaro', 'Nedvěd', 'Owen', 'Shevchenko', 'Bellingham']
  };

  // Gerar células do cartão de bingo
  useEffect(() => {
    generateBingoCard();
  }, []);

  // Simular chamada de itens a cada poucos segundos
  useEffect(() => {
    if (hasWon) return;
    
    const timer = setInterval(() => {
      callRandomItem();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [calledItems, hasWon]);

  // Verificar vitória
  useEffect(() => {
    if (hasWon) return;
    
    if (checkForWin()) {
      setHasWon(true);
      toast({
        title: "BINGO!",
        description: "Parabéns! Você completou seu cartão de bingo!",
      });
      if (onBingo) onBingo();
    }
  }, [cells]);

  const generateBingoCard = () => {
    const newCard: BingoCell[][] = [];
    
    // Criar um grid 5x5
    for (let i = 0; i < 5; i++) {
      const row: BingoCell[] = [];
      
      for (let j = 0; j < 5; j++) {
        // O centro é o espaço livre
        if (i === 2 && j === 2) {
          row.push({
            id: `cell-${i}-${j}`,
            value: 'FREE',
            category: 'free',
            marked: true
          });
          continue;
        }
        
        // Selecionar categoria para esta coluna
        const category = categories[j];
        
        // Selecionar jogador aleatório para esta categoria
        const categoryPlayers = [...players[category as keyof typeof players]];
        const randomIndex = Math.floor(Math.random() * categoryPlayers.length);
        const player = categoryPlayers[randomIndex];
        
        row.push({
          id: `cell-${i}-${j}`,
          value: player,
          category,
          marked: false
        });
      }
      
      newCard.push(row);
    }
    
    setCells(newCard);
  };

  const callRandomItem = () => {
    // Selecionar categoria aleatória
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Selecionar jogador aleatório dessa categoria
    const categoryPlayers = players[randomCategory as keyof typeof players];
    const randomPlayer = categoryPlayers[Math.floor(Math.random() * categoryPlayers.length)];
    
    // Evitar chamar o mesmo item duas vezes
    if (!calledItems.includes(`${randomPlayer}-${randomCategory}`)) {
      setCalledItems(prev => [...prev, `${randomPlayer}-${randomCategory}`]);
      
      toast({
        title: randomCategory,
        description: randomPlayer,
        duration: 4000,
      });
      
      // Marcar a célula se presente no cartão
      setCells(prevCells => 
        prevCells.map(row => 
          row.map(cell => 
            (cell.value === randomPlayer && cell.category === randomCategory)
              ? { ...cell, marked: true }
              : cell
          )
        )
      );
    }
  };

  const toggleCell = (rowIndex: number, cellIndex: number) => {
    if (hasWon) return;
    
    setCells(prevCells => {
      const newCells = [...prevCells];
      const cell = newCells[rowIndex][cellIndex];
      
      // Não permitir marcar/desmarcar o espaço livre
      if (cell.category === 'free') return prevCells;
      
      newCells[rowIndex][cellIndex] = {
        ...cell,
        marked: !cell.marked
      };
      
      return newCells;
    });
  };

  const checkForWin = () => {
    // Verificar linhas
    for (let i = 0; i < 5; i++) {
      if (cells[i]?.every(cell => cell.marked)) return true;
    }
    
    // Verificar colunas
    for (let j = 0; j < 5; j++) {
      let allMarked = true;
      for (let i = 0; i < 5; i++) {
        if (!cells[i]?.[j]?.marked) {
          allMarked = false;
          break;
        }
      }
      if (allMarked) return true;
    }
    
    // Verificar diagonal principal
    let diag1 = true;
    for (let i = 0; i < 5; i++) {
      if (!cells[i]?.[i]?.marked) {
        diag1 = false;
        break;
      }
    }
    if (diag1) return true;
    
    // Verificar diagonal secundária
    let diag2 = true;
    for (let i = 0; i < 5; i++) {
      if (!cells[i]?.[4-i]?.marked) {
        diag2 = false;
        break;
      }
    }
    return diag2;
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 border-4 border-fu-blue-500">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-heading font-bold text-fu-blue-600">BINGO FUTEBOL</h2>
        </div>
        
        <div className="grid grid-cols-5 gap-1">
          {categories.map((category, index) => (
            <div key={`header-${index}`} className="text-xs font-bold p-1 text-center bg-fu-blue-100 rounded-t text-fu-blue-800">
              {category.length > 10 ? category.split(' ')[0] : category}
            </div>
          ))}
          
          {cells.map((row, rowIndex) => (
            row.map((cell, cellIndex) => (
              <div
                key={cell.id}
                className={`
                  ${cell.category === 'free' ? 'bingo-free' : 'bingo-cell'} 
                  ${cell.marked ? 'marked' : ''}
                  flex items-center justify-center text-xs sm:text-sm cursor-pointer
                `}
                onClick={() => toggleCell(rowIndex, cellIndex)}
              >
                {cell.category === 'free' ? (
                  <div className="flex flex-col items-center justify-center">
                    <Football size={20} />
                    <span>FREE</span>
                  </div>
                ) : cell.marked ? (
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircle2 size={16} className="mb-1" />
                    <span>{cell.value}</span>
                  </div>
                ) : (
                  <span>{cell.value}</span>
                )}
              </div>
            ))
          ))}
        </div>
        
        {hasWon && (
          <div className="mt-4 p-2 bg-fu-gold-100 text-fu-gold-800 border border-fu-gold-300 rounded-md text-center animated-bounce">
            <p className="font-bold">BINGO! Parabéns!</p>
            <p className="text-sm">Você ganhou 50 moedas e uma carta rara!</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <button onClick={generateBingoCard} className="bg-fu-blue-500 hover:bg-fu-blue-600 text-white px-4 py-2 rounded-md">
          Nova Cartela
        </button>
        {/* For development purposes, manual call button */}
        <button onClick={callRandomItem} className="ml-4 bg-fu-green-500 hover:bg-fu-green-600 text-white px-4 py-2 rounded-md">
          Chamar Item
        </button>
      </div>
    </div>
  );
};

export default BingoCard;
