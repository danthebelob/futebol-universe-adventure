
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy,
  Star,
  Gamepad2,
  Medal,
  Clock,
  BadgePercent
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface UserProfileProps {
  username: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  wins: number;
  matches: number;
  avatarSrc?: string;
  cardsCollected: number;
  totalCards: number;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  level,
  xp,
  maxXp,
  coins,
  wins,
  matches,
  avatarSrc = '/images/avatar-placeholder.png',
  cardsCollected,
  totalCards
}) => {
  const winRate = matches > 0 ? Math.round((wins / matches) * 100) : 0;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-fu-green-100">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:mr-6 mb-4 md:mb-0">
          <div className="relative">
            <img 
              src={avatarSrc}
              alt={username}
              className="w-24 h-24 rounded-full border-4 border-fu-green-500 object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-fu-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-white">
              {level}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-heading font-bold text-fu-green-800">{username}</h2>
          
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nível {level}</span>
              <span className="text-sm font-bold">{xp}/{maxXp} XP</span>
            </div>
            <Progress value={(xp / maxXp) * 100} className="h-2 mt-1" />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <BadgePercent size={18} className="text-fu-gold-500 mr-1" />
              <span className="text-sm font-medium">{coins} Moedas</span>
            </div>
            <div className="flex items-center">
              <Trophy size={18} className="text-fu-gold-500 mr-1" />
              <span className="text-sm font-medium">{wins} Vitórias</span>
            </div>
            <div className="flex items-center">
              <Gamepad2 size={18} className="text-fu-blue-600 mr-1" />
              <span className="text-sm font-medium">{matches} Partidas</span>
            </div>
            <div className="flex items-center">
              <Medal size={18} className="text-fu-green-600 mr-1" />
              <span className="text-sm font-medium">{winRate}% Taxa de Vitória</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-heading font-bold text-fu-green-700 mb-2">Coleção</h3>
        <div className="bg-fu-green-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{cardsCollected}/{totalCards} cartas</span>
            <span className="text-sm font-bold">{Math.round((cardsCollected/totalCards) * 100)}%</span>
          </div>
          <Progress value={(cardsCollected/totalCards) * 100} className="h-2 mt-1" />
          
          <div className="mt-3">
            <Link 
              to="/colecao"
              className="text-sm text-fu-green-600 hover:text-fu-green-800 font-medium hover:underline"
            >
              Ver minha coleção
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <div>
          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            Último login: Hoje
          </div>
        </div>
        <Link 
          to="/perfil/editar"
          className="text-xs text-fu-blue-600 hover:text-fu-blue-800 font-medium hover:underline"
        >
          Editar perfil
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
