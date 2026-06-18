import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

// Criamos um tipo para definir o que precisamos salvar de cada Pokémon
type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function TeamBuilder() {
  // Estado que guarda os 6 Pokémon do time (inicia com 6 espaços vazios/nulos)
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  // Estado para controlar se está carregando os dados da API
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomTeam = async () => {
    setIsLoading(true);
    
    try {
      // Usamos um Set (Conjunto) porque ele não aceita valores repetidos.
      // Assim garantimos 6 IDs únicos.
      const randomIds = new Set<number>();
      while (randomIds.size < 6) {
        // Sorteia um número de 1 a 1025 (total aproximado de Pokémon atualmente)
        const randomId = Math.floor(Math.random() * 1025) + 1;
        randomIds.add(randomId);
      }

      // Prepara 6 requisições para a PokéAPI ao mesmo tempo
      const fetchPromises = Array.from(randomIds).map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        
        return {
          id: data.id,
          name: data.name,
          // Pega a arte oficial que tem melhor qualidade que o sprite normal
          imageUrl: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        };
      });

      // Executa todas as buscas juntas e aguarda terminar
      const newTeam = await Promise.all(fetchPromises);
      
      // Salva o novo time na tela
      setTeam(newTeam);

    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
      alert("Houve uma falha de comunicação com a PokéDex. Tente novamente.");
    } finally {
      setIsLoading(false); // Para de girar o botão independentemente de dar certo ou erro
    }
  };

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.tituloApp}>MEU TIME</Text>
        <Text style={styles.subtitulo}>Esquadrão de Batalha</Text>
      </View>

      {/* SLOTS DO TIME */}
      <View style={styles.gridContainer}>
        {team.map((pokemon, index) => (
          <TouchableOpacity key={index} style={styles.slot}>
            {pokemon ? (
              // Se tiver um Pokémon nesse slot, mostra a imagem dele
              <Image source={{ uri: pokemon.imageUrl }} style={styles.pokemonImage} />
            ) : (
              // Se for nulo (vazio), mostra a Pokébola de fundo
              <MaterialCommunityIcons name="pokeball" size={50} color="#2A2F3A" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* BOTÃO GERADOR */}
      {/* Desabilita o botão (disabled) para evitar que o usuário clique 2x seguidas */}
      <TouchableOpacity 
        style={[styles.generateButton, isLoading && styles.generateButtonDisabled]} 
        onPress={generateRandomTeam}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF"/>
        ) : (
          <>
            <MaterialCommunityIcons name="creation" size={24} color="#E0E0E0" style={{ marginRight: 8 }} />
            <Text style={styles.generateButtonText}>Gerar Time Aleatório</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D24', 
    alignItems: 'center',
    padding: 24,
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  tituloApp: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
  },
  subtitulo: {
    color: '#E3350D',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
    letterSpacing: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15, 
    width: '100%',
    marginBottom: 40,
  },
  slot: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  pokemonImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain', // Garante que o Pokémon caiba no quadrado perfeitamente
  },
  generateButton: {
    backgroundColor: '#2A2F3A', // Cinza escuro para contraste leve
    padding: 16,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 4, // Detalhe lateral de interface digital
    borderColor: '#E3350D', 
  },
  generateButtonDisabled: {
    backgroundColor: '#8C2B14', // Fica mais escuro quando está carregando
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});