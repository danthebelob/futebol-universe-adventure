
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  isNew?: boolean;
  comingSoon?: boolean;
  route: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  imagePath,
  isNew = false,
  comingSoon = false,
  route
}) => {
  return (
    <div className="game-card h-full">
      <div className="relative">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-fu-blue-600">Novo</Badge>
        )}
        {comingSoon && (
          <Badge className="absolute top-2 right-2 bg-fu-gold-600">Em Breve</Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="card-title">{title}</h3>
        <p className="card-description mt-2">{description}</p>
        <div className="mt-4">
          {comingSoon ? (
            <button disabled className="btn-primary opacity-60 cursor-not-allowed">
              Em Breve
            </button>
          ) : (
            <Link to={route} className="btn-primary inline-block">
              Jogar Agora
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
