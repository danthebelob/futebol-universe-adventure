
import { supabase } from '@/integrations/supabase/client';

export interface Player {
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
  teams: string[];
}

export const fetchPlayers = async (): Promise<Player[]> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*');
      
    if (error) {
      console.error('Erro ao buscar jogadores:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('Nenhum jogador encontrado, usando dados de demonstração');
      return getDemoPlayers();
    }
    
    // Converter dados do Supabase para o formato Player
    return data.map(player => ({
      id: player.id,
      name: player.name,
      position: player.attributes?.position as string || 'CA',
      nationality: player.attributes?.nationality as string || 'Brasil',
      club: player.attributes?.club as string || 'Sem Clube',
      overall: player.attributes?.overall as number || 75,
      attack: player.attributes?.attack as number || 70,
      defense: player.attributes?.defense as number || 60,
      imageSrc: player.image_url,
      rarity: player.attributes?.rarity as 'common' | 'rare' | 'epic' | 'legendary' || 'common',
      teams: player.teams || []
    }));
    
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    return getDemoPlayers();
  }
};

export const addDemoPlayers = async () => {
  const demoPlayers = [
    {
      name: "Lionel Messi",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      teams: ["Barcelona", "PSG", "Inter Miami", "Argentina", "Campeão do Mundo"],
      attributes: {
        position: "PD",
        nationality: "Argentina",
        club: "Inter Miami",
        overall: 94,
        attack: 95,
        defense: 38,
        rarity: "legendary"
      }
    },
    {
      name: "Cristiano Ronaldo",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
      teams: ["Manchester United", "Real Madrid", "Juventus", "Al-Nassr", "Portugal"],
      attributes: {
        position: "CA",
        nationality: "Portugal",
        club: "Al-Nassr",
        overall: 92,
        attack: 94,
        defense: 35,
        rarity: "legendary"
      }
    },
    {
      name: "Neymar Jr.",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Bra-Cos_%281%29_%28cropped%29.jpg",
      teams: ["Santos", "Barcelona", "PSG", "Al-Hilal", "Brasil"],
      attributes: {
        position: "PE",
        nationality: "Brasil",
        club: "Al-Hilal",
        overall: 89,
        attack: 91,
        defense: 30,
        rarity: "epic"
      }
    },
    {
      name: "Kylian Mbappé",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank–129_%28cropped%29.jpg",
      teams: ["Monaco", "PSG", "Real Madrid", "França"],
      attributes: {
        position: "CA",
        nationality: "França",
        club: "Real Madrid",
        overall: 91,
        attack: 93,
        defense: 36,
        rarity: "epic"
      }
    },
    {
      name: "Kevin De Bruyne",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kevin_De_Bruyne_2018.jpg",
      teams: ["Genk", "Chelsea", "Wolfsburg", "Manchester City", "Bélgica"],
      attributes: {
        position: "MC",
        nationality: "Bélgica",
        club: "Manchester City",
        overall: 91,
        attack: 88,
        defense: 64,
        rarity: "rare"
      }
    },
    {
      name: "Robert Lewandowski",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Robert_Lewandowski%2C_FC_Bayern_München_%28by_Sven_Mandel%2C_2019-05-27%29_03.jpg",
      teams: ["Dortmund", "Bayern Munich", "Barcelona", "Polônia"],
      attributes: {
        position: "CA",
        nationality: "Polônia",
        club: "Barcelona",
        overall: 90,
        attack: 92,
        defense: 44,
        rarity: "rare"
      }
    },
    {
      name: "Vinícius Júnior",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Vinicius_Junior_2021.jpg",
      teams: ["Flamengo", "Real Madrid", "Brasil"],
      attributes: {
        position: "PE",
        nationality: "Brasil",
        club: "Real Madrid",
        overall: 89,
        attack: 90,
        defense: 29,
        rarity: "rare"
      }
    }
  ];

  for (const player of demoPlayers) {
    const { error } = await supabase
      .from('players')
      .insert([player]);
      
    if (error) {
      console.error(`Erro ao adicionar ${player.name}:`, error);
    } else {
      console.log(`${player.name} adicionado com sucesso!`);
    }
  }
};

export const getDemoPlayers = (): Player[] => {
  return [
    {
      id: "1",
      name: "Lionel Messi",
      position: "PD",
      nationality: "Argentina",
      club: "Inter Miami",
      overall: 94,
      attack: 95,
      defense: 38,
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      rarity: "legendary",
      teams: ["Barcelona", "PSG", "Inter Miami", "Argentina", "Campeão do Mundo"]
    },
    {
      id: "2",
      name: "Cristiano Ronaldo",
      position: "CA",
      nationality: "Portugal",
      club: "Al-Nassr",
      overall: 92,
      attack: 94,
      defense: 35,
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
      rarity: "legendary",
      teams: ["Manchester United", "Real Madrid", "Juventus", "Al-Nassr", "Portugal"]
    },
    {
      id: "3",
      name: "Neymar Jr.",
      position: "PE",
      nationality: "Brasil",
      club: "Al-Hilal",
      overall: 89,
      attack: 91,
      defense: 30,
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Bra-Cos_%281%29_%28cropped%29.jpg",
      rarity: "epic",
      teams: ["Santos", "Barcelona", "PSG", "Al-Hilal", "Brasil"]
    },
    {
      id: "4",
      name: "Kylian Mbappé",
      position: "CA",
      nationality: "França",
      club: "Real Madrid",
      overall: 91,
      attack: 93,
      defense: 36,
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/5/57/2019-07-17_SG_Dynamo_Dresden_vs._Paris_Saint-Germain_by_Sandro_Halank–129_%28cropped%29.jpg",
      rarity: "epic",
      teams: ["Monaco", "PSG", "Real Madrid", "França"]
    },
    {
      id: "5",
      name: "Kevin De Bruyne",
      position: "MC",
      nationality: "Bélgica",
      club: "Manchester City",
      overall: 91,
      attack: 88,
      defense: 64,
      imageSrc: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kevin_De_Bruyne_2018.jpg",
      rarity: "rare",
      teams: ["Genk", "Chelsea", "Wolfsburg", "Manchester City", "Bélgica"]
    }
  ];
};

// Função para criar jogador aleatório para demonstração
export const getRandomPlayer = (id: string): Player => {
  const demoPlayers = getDemoPlayers();
  const randomIndex = Math.floor(Math.random() * demoPlayers.length);
  const basePlayer = demoPlayers[randomIndex];
  
  return {
    ...basePlayer,
    id
  };
};
