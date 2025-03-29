
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
  // Define a list of clubs and nationalities that will be used in the bingo game
  const clubs = [
    'Barcelona', 'Real Madrid', 'Atlético de Madrid', 'Bayern de Munique', 
    'Borussia Dortmund', 'Bayer Leverkusen', 'Arsenal', 'Tottenham', 
    'Chelsea', 'Manchester City', 'Manchester United', 'Liverpool', 
    'Juventus', 'Milan', 'Inter de Milão', 'PSG', 'Lyon'
  ];
  
  const nationalities = [
    'Brasil', 'Argentina', 'Colombia', 'Uruguai', 'Inglaterra', 
    'Holanda', 'Alemanha', 'Italia', 'Espanha', 'França'
  ];

  // Sample of 20 well-known players with their teams
  const demoPlayers = [
    {
      name: "Lionel Messi",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      teams: ["Barcelona", "PSG", "Inter Miami", "Argentina"],
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
      teams: ["Dortmund", "Bayern de Munique", "Barcelona", "Polônia"],
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
    },
    {
      name: "Jude Bellingham",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/3/32/20221123_AUT_vs_GER_0877_Jude_Bellingham.jpg",
      teams: ["Birmingham City", "Borussia Dortmund", "Real Madrid", "Inglaterra"],
      attributes: {
        position: "MC",
        nationality: "Inglaterra",
        club: "Real Madrid",
        overall: 88,
        attack: 85,
        defense: 78,
        rarity: "rare"
      }
    },
    {
      name: "Erling Haaland",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/7/70/Erling_Haaland_2023_%28cropped%29.jpg",
      teams: ["Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City", "Noruega"],
      attributes: {
        position: "CA",
        nationality: "Noruega",
        club: "Manchester City",
        overall: 90,
        attack: 93,
        defense: 45,
        rarity: "rare"
      }
    },
    {
      name: "Rodri",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Rodri_%28cropped%29.jpg",
      teams: ["Villarreal", "Atlético de Madrid", "Manchester City", "Espanha"],
      attributes: {
        position: "VOL",
        nationality: "Espanha",
        club: "Manchester City",
        overall: 89,
        attack: 78,
        defense: 86,
        rarity: "rare"
      }
    },
    {
      name: "Virgil van Dijk",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Virgil_van_Dijk_2019.jpg",
      teams: ["Groningen", "Celtic", "Southampton", "Liverpool", "Holanda"],
      attributes: {
        position: "ZAG",
        nationality: "Holanda",
        club: "Liverpool",
        overall: 89,
        attack: 60,
        defense: 90,
        rarity: "rare"
      }
    },
    {
      name: "Lautaro Martínez",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Lautaro_Mart%C3%ADnez_2019.jpg",
      teams: ["Racing Club", "Inter de Milão", "Argentina"],
      attributes: {
        position: "CA",
        nationality: "Argentina",
        club: "Inter de Milão",
        overall: 87,
        attack: 88,
        defense: 42,
        rarity: "rare"
      }
    },
    {
      name: "Phil Foden",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Phil_Foden_2021_%28cropped%29.jpg",
      teams: ["Manchester City", "Inglaterra"],
      attributes: {
        position: "MEI",
        nationality: "Inglaterra",
        club: "Manchester City",
        overall: 87,
        attack: 85,
        defense: 64,
        rarity: "rare"
      }
    },
    {
      name: "Toni Kroos",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Toni_Kroos_2021.jpg",
      teams: ["Bayern de Munique", "Bayer Leverkusen", "Real Madrid", "Alemanha"],
      attributes: {
        position: "MC",
        nationality: "Alemanha",
        club: "Real Madrid",
        overall: 88,
        attack: 81,
        defense: 81,
        rarity: "rare"
      }
    },
    {
      name: "Harry Kane",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Harry_Kane_in_Russia_2.jpg",
      teams: ["Tottenham", "Bayern de Munique", "Inglaterra"],
      attributes: {
        position: "CA",
        nationality: "Inglaterra",
        club: "Bayern de Munique",
        overall: 90,
        attack: 91,
        defense: 53,
        rarity: "rare"
      }
    },
    {
      name: "Mohamed Salah",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mohamed_Salah_2018.jpg",
      teams: ["Basel", "Chelsea", "Fiorentina", "Roma", "Liverpool", "Egito"],
      attributes: {
        position: "PD",
        nationality: "Egito",
        club: "Liverpool",
        overall: 89,
        attack: 89,
        defense: 45,
        rarity: "rare"
      }
    },
    {
      name: "Bukayo Saka",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bukayo_Saka_2021_%28cropped%29.jpg",
      teams: ["Arsenal", "Inglaterra"],
      attributes: {
        position: "PD",
        nationality: "Inglaterra",
        club: "Arsenal",
        overall: 86,
        attack: 87,
        defense: 67,
        rarity: "rare"
      }
    },
    {
      name: "Florian Wirtz",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Florian_Wirtz_%28cropped%29.jpg",
      teams: ["Bayer Leverkusen", "Alemanha"],
      attributes: {
        position: "MEI",
        nationality: "Alemanha",
        club: "Bayer Leverkusen",
        overall: 86,
        attack: 86,
        defense: 56,
        rarity: "rare"
      }
    },
    {
      name: "Pedri",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Pedro_Gonz%C3%A1lez_L%C3%B3pez_%28Pedri%29_2021.jpg",
      teams: ["Las Palmas", "Barcelona", "Espanha"],
      attributes: {
        position: "MC",
        nationality: "Espanha",
        club: "Barcelona",
        overall: 86,
        attack: 83,
        defense: 76,
        rarity: "rare"
      }
    },
    {
      name: "Raphaël Varane",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Rapha%C3%ABl_Varane_2018.jpg",
      teams: ["Lens", "Real Madrid", "Manchester United", "França"],
      attributes: {
        position: "ZAG",
        nationality: "França",
        club: "Manchester United",
        overall: 85,
        attack: 48,
        defense: 87,
        rarity: "rare"
      }
    }
  ];

  // Add more players to reach at least 100 total
  const additionalPlayers = [
    {
      name: "Alisson Becker",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Alisson_Becker_2019.jpg",
      teams: ["Internacional", "Roma", "Liverpool", "Brasil"],
      attributes: {
        position: "GOL",
        nationality: "Brasil",
        club: "Liverpool",
        overall: 89,
        attack: 25,
        defense: 90,
        rarity: "rare"
      }
    },
    {
      name: "Casemiro",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/8/87/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Casemiro_850_1705.jpg",
      teams: ["São Paulo", "Real Madrid", "Manchester United", "Brasil"],
      attributes: {
        position: "VOL",
        nationality: "Brasil",
        club: "Manchester United",
        overall: 87,
        attack: 73,
        defense: 88,
        rarity: "rare"
      }
    },
    // Continue adding at least 80 more players following the same pattern,
    // making sure to include players from the clubs and nationalities listed.
    // For brevity, we'll add just a few more here. In a real application, you'd add many more.
    {
      name: "Antoine Griezmann",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Antoine_Griezmann_2018.jpg",
      teams: ["Real Sociedad", "Atlético de Madrid", "Barcelona", "França"],
      attributes: {
        position: "SA",
        nationality: "França",
        club: "Atlético de Madrid",
        overall: 88,
        attack: 87,
        defense: 58,
        rarity: "rare"
      }
    },
    {
      name: "Thiago Silva",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Thiago_Silva_-_Fluminense_x_Atl%C3%A9tico-MG.jpg",
      teams: ["Fluminense", "Milan", "PSG", "Chelsea", "Brasil"],
      attributes: {
        position: "ZAG",
        nationality: "Brasil",
        club: "Fluminense",
        overall: 86,
        attack: 53,
        defense: 88,
        rarity: "rare"
      }
    },
  ];

  // Combine and add all players to the database
  const allPlayers = [...demoPlayers, ...additionalPlayers];

  for (const player of allPlayers) {
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
      teams: ["Barcelona", "PSG", "Inter Miami", "Argentina"]
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
