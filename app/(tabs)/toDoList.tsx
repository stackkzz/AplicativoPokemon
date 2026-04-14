import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTarefas } from '../hooks/useTarefas';

export default function App() {
  const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#fff" // Cor da placeholder alterada para branco
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        {/* O componente Button nativo do Android tem limitações de cor, 
            por isso o 'color' aqui define a cor do botão ou do texto dependendo da plataforma */}
        <Button title="Adicionar" onPress={adicionarTarefa} color="#ff4444" /> 
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tarefaContainer}>
            <Text style={styles.tarefaTexto}>{item.texto}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#25292e' // Mantendo seu fundo original
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#fff'
  },
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 10,
    alignItems: 'center' 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ff4444', // Borda agora em vermelho para combinar
    padding: 10, 
    borderRadius: 5, 
    marginRight: 10, 
    color: '#fff' // Cor do texto digitado
  },
  tarefaContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#3d444d', // Mudado para cinza escuro para melhor legibilidade no modo dark
    padding: 15,
    marginBottom: 8, 
    borderRadius: 5, 
    elevation: 2 
  },
  tarefaTexto: { 
    fontSize: 16, 
    color: '#fff' // Texto da tarefa em branco
  },
  remover: { 
    fontSize: 18, 
    color: '#ff4444', // X de remover em vermelho
    fontWeight: 'bold' 
  },
});