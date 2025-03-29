
import React, { useEffect, useState } from 'react';
import { Player, fetchPlayers, addDemoPlayers } from '@/utils/playerUtils';
import PlayerCard from './PlayerCard';
import { Button } from './ui/button';
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PlayerManager = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadPlayers();
  }, []);
  
  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await fetchPlayers();
      setPlayers(data);
      
      if (data.length === 0) {
        toast({
          title: "Nenhum jogador encontrado",
          description: "Clique em 'Adicionar Jogadores' para carregar alguns jogadores de demonstração.",
        });
      }
    } catch (error) {
      console.error('Erro ao carregar jogadores:', error);
      toast({
        title: "Erro ao carregar jogadores",
        description: "Não foi possível carregar os jogadores. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddDemoPlayers = async () => {
    try {
      await addDemoPlayers();
      toast({
        title: "Jogadores adicionados",
        description: "Jogadores de demonstração foram adicionados com sucesso.",
      });
      loadPlayers();
    } catch (error) {
      console.error('Erro ao adicionar jogadores:', error);
      toast({
        title: "Erro ao adicionar jogadores",
        description: "Não foi possível adicionar os jogadores de demonstração.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciador de Jogadores</CardTitle>
        <CardDescription>Visualize e gerencie os jogadores do bingo</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center p-4">Carregando jogadores...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map(player => (
              <PlayerCard 
                key={player.id} 
                id={player.id}
                name={player.name}
                position={player.position}
                nationality={player.nationality}
                club={player.club}
                overall={player.overall}
                attack={player.attack}
                defense={player.defense}
                imageSrc={player.imageSrc}
                rarity={player.rarity}
              />
            ))}
            
            {players.length === 0 && (
              <div className="col-span-full text-center p-4 text-gray-500">
                Nenhum jogador encontrado. Adicione jogadores de demonstração.
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={loadPlayers}>Atualizar</Button>
        <Button onClick={handleAddDemoPlayers}>Adicionar Jogadores Demo</Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerManager;
