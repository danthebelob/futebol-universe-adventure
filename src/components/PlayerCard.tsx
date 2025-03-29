
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Zap } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  nationality: string;
  club: string;
  overall: number;
  attack: number;
  defense: number;
  imageSrc?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  id,
  name,
  position,
  nationality,
  club,
  overall,
  attack,
  defense,
  imageSrc,
  rarity = 'common'
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const loadPlayerImage = async () => {
      try {
        // Se já temos uma URL completa do Supabase ou outra fonte externa, use-a diretamente
        if (imageSrc && (imageSrc.startsWith('https://') || imageSrc.startsWith('http://'))) {
          setImageUrl(imageSrc);
          return;
        }
        
        // Se temos um caminho para o storage do Supabase
        if (imageSrc && !imageSrc.startsWith('/')) {
          const { data } = await supabase.storage
            .from('player_images')
            .getPublicUrl(imageSrc);
            
          if (data && data.publicUrl) {
            setImageUrl(data.publicUrl);
          }
        } else {
          // Usando o caminho local ou placeholder
          setImageUrl(imageSrc || '/images/player-placeholder.png');
        }
      } catch (error) {
        console.error('Erro ao carregar imagem:', error);
        setImageError(true);
      }
    };
    
    loadPlayerImage();
  }, [imageSrc]);
  
  const cardClass = `player-card player-card-${rarity}`;
  
  const rarityLabel = {
    common: 'Comum',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Lendário'
  };
  
  const positionColors = {
    GOL: 'bg-yellow-500',
    ZAG: 'bg-blue-500',
    LD: 'bg-blue-500',
    LE: 'bg-blue-500',
    VOL: 'bg-green-500',
    MC: 'bg-green-500',
    MEI: 'bg-green-500',
    PE: 'bg-red-500',
    PD: 'bg-red-500',
    SA: 'bg-red-500',
    CA: 'bg-red-500',
  };
  
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleImageError = () => {
    console.log('Erro ao carregar imagem para:', name);
    setImageError(true);
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
    
    return flagCodes[nationality] || '';
  };
  
  return (
    <div 
      className={`${cardClass} w-full max-w-[200px] aspect-[2/3] cursor-pointer`}
      onClick={handleClick}
      style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
    >
      {!isFlipped ? (
        // Frente do cartão
        <div className="p-2 h-full flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className={`${positionColors[position as keyof typeof positionColors] || 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded`}>
              {position}
            </div>
            <div className="bg-white/80 rounded-full h-8 w-8 flex items-center justify-center font-bold">
              {overall}
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <img 
              src={imageError ? '/images/player-placeholder.png' : (imageUrl || '/images/player-placeholder.png')}
              alt={name}
              className="h-[60%] object-contain mx-auto"
              onError={handleImageError}
            />
          </div>
          
          <div className="mt-auto bg-white/80 rounded-md p-2">
            <h3 className="text-center font-bold text-sm truncate">{name}</h3>
            <div className="flex justify-between text-xs mt-1">
              <span className="flex items-center">
                {getNationalityFlag(nationality)} {nationality}
              </span>
              <span>{club}</span>
            </div>
            
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <Zap size={14} className="text-red-500 mr-1" />
                <span className="text-xs">{attack}</span>
              </div>
              <div className="flex items-center">
                <Shield size={14} className="text-blue-500 mr-1" />
                <span className="text-xs">{defense}</span>
              </div>
              <Badge className={`
                ${rarity === 'common' ? 'bg-gray-500' : ''}
                ${rarity === 'rare' ? 'bg-fu-gold-500' : ''}
                ${rarity === 'epic' ? 'bg-fu-blue-600' : ''}
                ${rarity === 'legendary' ? 'bg-purple-600' : ''}
                text-white text-xs
              `}>
                {rarityLabel[rarity]}
              </Badge>
            </div>
          </div>
        </div>
      ) : (
        // Verso do cartão
        <div className="p-3 h-full flex flex-col items-center justify-center" style={{ transform: 'rotateY(180deg)' }}>
          <h3 className="font-bold mb-2">{name}</h3>
          
          <div className="space-y-2 w-full">
            <div className="bg-white/80 rounded p-2">
              <div className="text-xs text-gray-600">Posição</div>
              <div className="font-medium">{position}</div>
            </div>
            
            <div className="bg-white/80 rounded p-2">
              <div className="text-xs text-gray-600">Nacionalidade</div>
              <div className="font-medium flex items-center">
                <span className="mr-1">{getNationalityFlag(nationality)}</span>
                {nationality}
              </div>
            </div>
            
            <div className="bg-white/80 rounded p-2">
              <div className="text-xs text-gray-600">Clube</div>
              <div className="font-medium">{club}</div>
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <Star size={16} className="text-fu-gold-500" />
            <Star size={16} className="text-fu-gold-500" />
            <Star size={16} className={overall >= 80 ? "text-fu-gold-500" : "text-gray-300"} />
            <Star size={16} className={overall >= 85 ? "text-fu-gold-500" : "text-gray-300"} />
            <Star size={16} className={overall >= 90 ? "text-fu-gold-500" : "text-gray-300"} />
          </div>
          
          <div className="mt-2 text-xs text-center">
            ID: {id}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
