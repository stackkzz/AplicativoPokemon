import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
}

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => {
        const results = data.results.map((item: any, index: number) => ({
          ...item,
          id: (index + 1).toString(),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        setPokemonList(results);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = pokemonList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokédex Kanto</Text>
      
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Pokémon..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name.toUpperCase()}</Text>
            <Text style={styles.id}>#{item.id.padStart(3, '0')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#25292e' },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' },
  searchBar: {
    backgroundColor: '#3d444d',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  image: { width: 80, height: 80 },
  name: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  id: { fontSize: 12, color: '#666' },
});