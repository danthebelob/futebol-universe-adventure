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
      position: (player.attributes as any)?.position as string || 'CA',
      nationality: (player.attributes as any)?.nationality as string || 'Brasil',
      club: (player.attributes as any)?.club as string || 'Sem Clube',
      overall: Number((player.attributes as any)?.overall) || 75,
      attack: Number((player.attributes as any)?.attack) || 70,
      defense: Number((player.attributes as any)?.defense) || 60,
      imageSrc: player.image_url,
      rarity: (player.attributes as any)?.rarity as 'common' | 'rare' | 'epic' | 'legendary' || 'common',
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

  // Sample of 100+ well-known players with their teams
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
    },
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
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Thiago_Silva_-_Fluminense_x_Atlético-MG.jpg",
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
    {
      name: "Luka Modric",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Luka_Modric_2021.jpg",
      teams: ["Dinamo Zagreb", "Tottenham", "Real Madrid", "Croácia"],
      attributes: {
        position: "MC",
        nationality: "Croácia",
        club: "Real Madrid",
        overall: 87,
        attack: 80,
        defense: 76,
        rarity: "rare"
      }
    },
    {
      name: "N'Golo Kanté",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/N%27Golo_Kanté_2018.jpg",
      teams: ["Caen", "Leicester City", "Chelsea", "Al-Ittihad", "França"],
      attributes: {
        position: "VOL",
        nationality: "França",
        club: "Al-Ittihad",
        overall: 86,
        attack: 68,
        defense: 89,
        rarity: "rare"
      }
    },
    {
      name: "Joshua Kimmich",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/20180602_FIFA_Friendly_Match_Austria_vs._Germany_Joshua_Kimmich_850_0901.jpg/800px-20180602_FIFA_Friendly_Match_Austria_vs._Germany_Joshua_Kimmich_850_0901.jpg",
      teams: ["RB Leipzig", "Bayern de Munique", "Alemanha"],
      attributes: {
        position: "LD",
        nationality: "Alemanha",
        club: "Bayern de Munique",
        overall: 88,
        attack: 81,
        defense: 86,
        rarity: "rare"
      }
    },
    {
      name: "Bruno Fernandes",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Bruno_Fernandes_2023.jpg",
      teams: ["Sporting", "Manchester United", "Portugal"],
      attributes: {
        position: "MEI",
        nationality: "Portugal",
        club: "Manchester United",
        overall: 87,
        attack: 86,
        defense: 70,
        rarity: "rare"
      }
    },
    {
      name: "Trent Alexander-Arnold",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Trent_Alexander-Arnold_-_2018_%28cropped_2%29.jpg/800px-Trent_Alexander-Arnold_-_2018_%28cropped_2%29.jpg",
      teams: ["Liverpool", "Inglaterra"],
      attributes: {
        position: "LD",
        nationality: "Inglaterra",
        club: "Liverpool",
        overall: 86,
        attack: 83,
        defense: 79,
        rarity: "rare"
      }
    },
    {
      name: "Sadio Mané",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Sadio_Mané_850_1220.jpg/800px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Sadio_Mané_850_1220.jpg",
      teams: ["Southampton", "Liverpool", "Bayern de Munique", "Al-Nassr", "Senegal"],
      attributes: {
        position: "PE",
        nationality: "Senegal",
        club: "Al-Nassr",
        overall: 86,
        attack: 88,
        defense: 44,
        rarity: "rare"
      }
    },
    {
      name: "Manuel Neuer",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Manuel_Neuer_2017.jpg/800px-Manuel_Neuer_2017.jpg",
      teams: ["Schalke 04", "Bayern de Munique", "Alemanha"],
      attributes: {
        position: "GOL",
        nationality: "Alemanha",
        club: "Bayern de Munique",
        overall: 89,
        attack: 15,
        defense: 90,
        rarity: "rare"
      }
    },
    {
      name: "Sergio Ramos",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Sergio_Ramos_2018.jpg/800px-Sergio_Ramos_2018.jpg",
      teams: ["Sevilla", "Real Madrid", "PSG", "Espanha"],
      attributes: {
        position: "ZAG",
        nationality: "Espanha",
        club: "Sevilla",
        overall: 85,
        attack: 65,
        defense: 86,
        rarity: "rare"
      }
    },
    {
      name: "Ruben Dias",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rodri_%26_Ruben_Dias_2023.jpg/800px-Rodri_%26_Ruben_Dias_2023.jpg",
      teams: ["Benfica", "Manchester City", "Portugal"],
      attributes: {
        position: "ZAG",
        nationality: "Portugal",
        club: "Manchester City",
        overall: 87,
        attack: 52,
        defense: 89,
        rarity: "rare"
      }
    },
    {
      name: "Ederson",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Ederson_Moraes_2018.jpg/800px-Ederson_Moraes_2018.jpg",
      teams: ["Rio Ave", "Benfica", "Manchester City", "Brasil"],
      attributes: {
        position: "GOL",
        nationality: "Brasil",
        club: "Manchester City",
        overall: 88,
        attack: 30,
        defense: 89,
        rarity: "rare"
      }
    },
    {
      name: "Marquinhos",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Marquinhos_PSG_2021.jpg/800px-Marquinhos_PSG_2021.jpg",
      teams: ["Corinthians", "Roma", "PSG", "Brasil"],
      attributes: {
        position: "ZAG",
        nationality: "Brasil",
        club: "PSG",
        overall: 88,
        attack: 63,
        defense: 89,
        rarity: "rare"
      }
    },
    {
      name: "Thomas Müller",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Thomas_Müller_2017.jpg/800px-Thomas_Müller_2017.jpg",
      teams: ["Bayern de Munique", "Alemanha"],
      attributes: {
        position: "SA",
        nationality: "Alemanha",
        club: "Bayern de Munique",
        overall: 86,
        attack: 85,
        defense: 58,
        rarity: "rare"
      }
    },
    {
      name: "Heung-min Son",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Son_Heung-min_June_2018.jpg/800px-Son_Heung-min_June_2018.jpg",
      teams: ["Hamburger SV", "Bayer Leverkusen", "Tottenham", "Coreia do Sul"],
      attributes: {
        position: "PE",
        nationality: "Coreia do Sul",
        club: "Tottenham",
        overall: 87,
        attack: 88,
        defense: 43,
        rarity: "rare"
      }
    },
    {
      name: "Marc-André ter Stegen",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Marc-André_ter_Stegen_2018.jpg/800px-Marc-André_ter_Stegen_2018.jpg",
      teams: ["Borussia Mönchengladbach", "Barcelona", "Alemanha"],
      attributes: {
        position: "GOL",
        nationality: "Alemanha",
        club: "Barcelona",
        overall: 88,
        attack: 20,
        defense: 89,
        rarity: "rare"
      }
    },
    {
      name: "Luis Suárez",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Luis_Suárez_2018.jpg/800px-Luis_Suárez_2018.jpg",
      teams: ["Ajax", "Liverpool", "Barcelona", "Atlético de Madrid", "Inter Miami", "Uruguai"],
      attributes: {
        position: "CA",
        nationality: "Uruguai",
        club: "Inter Miami",
        overall: 86,
        attack: 88,
        defense: 42,
        rarity: "rare"
      }
    },
    {
      name: "Achraf Hakimi",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Achraf_Hakimi.jpg/800px-Achraf_Hakimi.jpg",
      teams: ["Real Madrid", "Borussia Dortmund", "Inter de Milão", "PSG", "Marrocos"],
      attributes: {
        position: "LD",
        nationality: "Marrocos",
        club: "PSG",
        overall: 85,
        attack: 83,
        defense: 80,
        rarity: "rare"
      }
    },
    {
      name: "Federico Valverde",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Federico_Valverde_2021.jpg/800px-Federico_Valverde_2021.jpg",
      teams: ["Peñarol", "Deportivo La Coruña", "Real Madrid", "Uruguai"],
      attributes: {
        position: "MC",
        nationality: "Uruguai",
        club: "Real Madrid",
        overall: 87,
        attack: 80,
        defense: 83,
        rarity: "rare"
      }
    },
    {
      name: "Dani Carvajal",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Carvajal_2018.jpg/800px-Carvajal_2018.jpg",
      teams: ["Bayer Leverkusen", "Real Madrid", "Espanha"],
      attributes: {
        position: "LD",
        nationality: "Espanha",
        club: "Real Madrid",
        overall: 85,
        attack: 77,
        defense: 84,
        rarity: "rare"
      }
    },
    {
      name: "David Alaba",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/David_Alaba_2021.jpg/800px-David_Alaba_2021.jpg",
      teams: ["Bayern de Munique", "Real Madrid", "Áustria"],
      attributes: {
        position: "ZAG",
        nationality: "Áustria",
        club: "Real Madrid",
        overall: 86,
        attack: 74,
        defense: 85,
        rarity: "rare"
      }
    },
    {
      name: "Marco Reus",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Marco_Reus_2018.jpg/800px-Marco_Reus_2018.jpg",
      teams: ["Borussia Mönchengladbach", "Borussia Dortmund", "Alemanha"],
      attributes: {
        position: "MEI",
        nationality: "Alemanha",
        club: "Borussia Dortmund",
        overall: 84,
        attack: 85,
        defense: 53,
        rarity: "rare"
      }
    },
    {
      name: "Bernardo Silva",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bernardo_Silva_2018.jpg/800px-Bernardo_Silva_2018.jpg",
      teams: ["Benfica", "Monaco", "Manchester City", "Portugal"],
      attributes: {
        position: "MD",
        nationality: "Portugal",
        club: "Manchester City",
        overall: 87,
        attack: 84,
        defense: 73,
        rarity: "rare"
      }
    },
    {
      name: "Andrew Robertson",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Andrew_Robertson_2018.jpg/800px-Andrew_Robertson_2018.jpg",
      teams: ["Hull City", "Liverpool", "Escócia"],
      attributes: {
        position: "LE",
        nationality: "Escócia",
        club: "Liverpool",
        overall: 86,
        attack: 80,
        defense: 83,
        rarity: "rare"
      }
    },
    {
      name: "Leroy Sané",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Leroy_Sané_2021.jpg/800px-Leroy_Sané_2021.jpg",
      teams: ["Schalke 04", "Manchester City", "Bayern de Munique", "Alemanha"],
      attributes: {
        position: "PD",
        nationality: "Alemanha",
        club: "Bayern de Munique",
        overall: 85,
        attack: 86,
        defense: 48,
        rarity: "rare"
      }
    },
    {
      name: "Jack Grealish",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Jack_Grealish_2021.jpg/800px-Jack_Grealish_2021.jpg",
      teams: ["Aston Villa", "Manchester City", "Inglaterra"],
      attributes: {
        position: "PE",
        nationality: "Inglaterra",
        club: "Manchester City",
        overall: 84,
        attack: 83,
        defense: 46,
        rarity: "rare"
      }
    },
    {
      name: "Kingsley Coman",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Kingsley_Coman_2020.jpg/800px-Kingsley_Coman_2020.jpg",
      teams: ["PSG", "Juventus", "Bayern de Munique", "França"],
      attributes: {
        position: "PE",
        nationality: "França",
        club: "Bayern de Munique",
        overall: 85,
        attack: 86,
        defense: 50,
        rarity: "rare"
      }
    },
    {
      name: "Raheem Sterling",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Raheem_Sterling_2018.jpg/800px-Raheem_Sterling_2018.jpg",
      teams: ["Liverpool", "Manchester City", "Chelsea", "Inglaterra"],
      attributes: {
        position: "PE",
        nationality: "Inglaterra",
        club: "Chelsea",
        overall: 85,
        attack: 85,
        defense: 45,
        rarity: "rare"
      }
    },
    {
      name: "Nico Williams",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Nico_Williams_2021.jpg",
      teams: ["Athletic Bilbao", "Espanha"],
      attributes: {
        position: "PE",
        nationality: "Espanha",
        club: "Athletic Bilbao",
        overall: 84,
        attack: 85,
        defense: 42,
        rarity: "rare"
      }
    },
    {
      name: "Lamine Yamal",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Lamine_Yamal.jpg",
      teams: ["Barcelona", "Espanha"],
      attributes: {
        position: "PD",
        nationality: "Espanha",
        club: "Barcelona",
        overall: 84,
        attack: 85,
        defense: 40,
        rarity: "rare"
      }
    },
    {
      name: "Declan Rice",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Declan_Rice_August_2023.jpg/800px-Declan_Rice_August_2023.jpg",
      teams: ["West Ham", "Arsenal", "Inglaterra"],
      attributes: {
        position: "VOL",
        nationality: "Inglaterra",
        club: "Arsenal",
        overall: 86,
        attack: 75,
        defense: 86,
        rarity: "rare"
      }
    },
    {
      name: "Marcus Rashford",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Marcus_Rashford_2018-06-13_1_%28cropped%29.jpg/800px-Marcus_Rashford_2018-06-13_1_%28cropped%29.jpg",
      teams: ["Manchester United", "Inglaterra"],
      attributes: {
        position: "PE",
        nationality: "Inglaterra",
        club: "Manchester United",
        overall: 85,
        attack: 87,
        defense: 42,
        rarity: "rare"
      }
    },
    {
      name: "Emiliano Martínez",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Emiliano_Martinez_2023.jpg/800px-Emiliano_Martinez_2023.jpg",
      teams: ["Arsenal", "Aston Villa", "Argentina"],
      attributes: {
        position: "GOL",
        nationality: "Argentina",
        club: "Aston Villa",
        overall: 87,
        attack: 15,
        defense: 88,
        rarity: "rare"
      }
    },
    {
      name: "Enzo Fernández",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Enzo_Fernandez_-_Benfica_-_2022_%28portrait%29.png/800px-Enzo_Fernandez_-_Benfica_-_2022_%28portrait%29.png",
      teams: ["River Plate", "Benfica", "Chelsea", "Argentina"],
      attributes: {
        position: "MC",
        nationality: "Argentina",
        club: "Chelsea",
        overall: 85,
        attack: 76,
        defense: 82,
        rarity: "rare"
      }
    },
    {
      name: "Alexis Mac Allister",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Alexis_Mac_Allister_-_CARP.jpg/800px-Alexis_Mac_Allister_-_CARP.jpg",
      teams: ["Boca Juniors", "Brighton", "Liverpool", "Argentina"],
      attributes: {
        position: "MC",
        nationality: "Argentina",
        club: "Liverpool",
        overall: 84,
        attack: 81,
        defense: 78,
        rarity: "rare"
      }
    },
    {
      name: "Romelu Lukaku",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Romelu_Lukaku_2018.jpg/800px-Romelu_Lukaku_2018.jpg",
      teams: ["Chelsea", "Everton", "Manchester United", "Inter de Milão", "Roma", "Bélgica"],
      attributes: {
        position: "CA",
        nationality: "Bélgica",
        club: "Roma",
        overall: 84,
        attack: 86,
        defense: 39,
        rarity: "rare"
      }
    },
    {
      name: "Rafael Leão",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Rafa_Leão_2022.jpg/800px-Rafa_Leão_2022.jpg",
      teams: ["Lille", "Milan", "Portugal"],
      attributes: {
        position: "PE",
        nationality: "Portugal",
        club: "Milan",
        overall: 86,
        attack: 87,
        defense: 38,
        rarity: "rare"
      }
    },
    {
      name: "João Cancelo",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/João_Cancelo_2018.jpg/800px-João_Cancelo_2018.jpg",
      teams: ["Juventus", "Manchester City", "Barcelona", "Bayern de Munique", "Portugal"],
      attributes: {
        position: "LD",
        nationality: "Portugal",
        club: "Barcelona",
        overall: 85,
        attack: 81,
        defense: 81,
        rarity: "rare"
      }
    },
    {
      name: "Eduardo Camavinga",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Antoine_Kombouaré_-_Stade_rennais_vs_EA_Guingamp%2C_6_April_2019_%2801%29_%28cropped%29.jpg/800px-Antoine_Kombouaré_-_Stade_rennais_vs_EA_Guingamp%2C_6_April_2019_%2801%29_%28cropped%29.jpg",
      teams: ["Rennes", "Real Madrid", "França"],
      attributes: {
        position: "MC",
        nationality: "França",
        club: "Real Madrid",
        overall: 84,
        attack: 75,
        defense: 81,
        rarity: "rare"
      }
    },
    {
      name: "Rodrygo",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Rodrygo_Goes_2022.jpg/800px-Rodrygo_Goes_2022.jpg",
      teams: ["Santos", "Real Madrid", "Brasil"],
      attributes: {
        position: "PD",
        nationality: "Brasil",
        club: "Real Madrid",
        overall: 85,
        attack: 86,
        defense: 38,
        rarity: "rare"
      }
    },
    {
      name: "Gabriel Jesus",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Gabriel_Jesus_%28cropped%29.jpg/800px-Gabriel_Jesus_%28cropped%29.jpg",
      teams: ["Palmeiras", "Manchester City", "Arsenal", "Brasil"],
      attributes: {
        position: "CA",
        nationality: "Brasil",
        club: "Arsenal",
        overall: 83,
        attack: 84,
        defense: 47,
        rarity: "rare"
      }
    },
    {
      name: "Gabriel Martinelli",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Gabriel_Martinelli_2022.jpg/800px-Gabriel_Martinelli_2022.jpg",
      teams: ["Ituano", "Arsenal", "Brasil"],
      attributes: {
        position: "PE",
        nationality: "Brasil",
        club: "Arsenal",
        overall: 84,
        attack: 85,
        defense: 42,
        rarity: "rare"
      }
    },
    {
      name: "William Saliba",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/William_Saliba_2022.jpg/800px-William_Saliba_2022.jpg",
      teams: ["Saint-Étienne", "Nice", "Marseille", "Arsenal", "França"],
      attributes: {
        position: "ZAG",
        nationality: "França",
        club: "Arsenal",
        overall: 85,
        attack: 57,
        defense: 86,
        rarity: "rare"
      }
    },
    {
      name: "Martin Ødegaard",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Martin_Ødegaard_2023.jpg/800px-Martin_Ødegaard_2023.jpg",
      teams: ["Real Madrid", "Arsenal", "Noruega"],
      attributes: {
        position: "MEI",
        nationality: "Noruega",
        club: "Arsenal",
        overall: 87,
        attack: 85,
        defense: 68,
        rarity: "rare"
      }
    }
  ];

  // Combine and add all players to the database
  const allPlayers = demoPlayers;

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

export const getRandomPlayer = (id: string): Player => {
  const demoPlayers = getDemoPlayers();
  const randomIndex = Math.floor(Math.random() * demoPlayers.length);
  const basePlayer = demoPlayers[randomIndex];
  
  return {
    ...basePlayer,
    id
  };
};
