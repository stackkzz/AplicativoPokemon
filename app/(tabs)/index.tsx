import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Título Simples e Direto */}
      <View style={styles.header}>
        <Text style={styles.tituloApp}>POKÉ APP</Text>
        <Text style={styles.subtitulo}>Painel do Treinador</Text>
      </View>

      {/* Lista de Navegação Estilizada */}
      <View style={styles.menu}>
        <Link href="/pokedex" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acessar Pokédex</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/toDoList" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Lista de Tarefas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/about" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sobre o Projeto</Text>
          </TouchableOpacity>
        </Link>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 50,
    alignItems: 'center',
  },
  tituloApp: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitulo: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
  menu: {
    width: '100%',
    gap: 15, 
  },
  button: {
    backgroundColor: '#3d444d', 
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4e555d',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    color: '#555',
    fontSize: 12,
  },
});