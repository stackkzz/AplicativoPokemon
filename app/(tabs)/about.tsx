import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
      <View style={styles.headerBanner}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' }} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.mainTitle}>Universo Pokémon</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.content}>
        
     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que são Pokémon?</Text>
          <Text style={styles.paragraph}>
            Pokémon são criaturas enigmáticas que compartilham o mundo com os seres humanos. Atualmente, a Pokédex regista mais de 1.000 espécies, cada uma com habilidades elementares únicas.
          </Text>
        </View>

     
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curiosidades do Mundo</Text>
          <View style={styles.infoCard}>
            <Text style={styles.cardItem}>• <Text style={styles.bold}>Geração I:</Text> Rhydon foi tecnicamente o primeiro Pokémon criado, aparecendo nos esboços iniciais.</Text>
            <Text style={styles.cardItem}>• <Text style={styles.bold}>Evolução:</Text> Inspirada na metamorfose real, mas com um toque fantástico de crescimento instantâneo.</Text>
            <Text style={styles.cardItem}>• <Text style={styles.bold}>Linguagem:</Text> No anime, os Pokémon geralmente repetem sílabas de seus próprios nomes.</Text>
          </View>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Pokémon Company</Text>
          <View style={styles.companyCard}>
            <Text style={styles.companyText}>
              Fundada em 1998, a empresa é uma parceria entre a Nintendo,Game Freak e Creatures. Ela gere a marca globalmente.
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>1996</Text>
                <Text style={styles.statLabel}>Lançamento</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>Top 1</Text>
                <Text style={styles.statLabel}>Franquia Global</Text>
              </View>
            </View>
            <Text style={styles.cardItem}>• <Text style={styles.bold}>Líder de Mercado:</Text> É a franquia de média mais lucrativa da história, superando Star Wars e Marvel.</Text>
            <Text style={styles.cardItem}>• <Text style={styles.bold}>Sede:</Text> Localizada em Roppongi Hills, Tóquio, Japão.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', 
  },
  headerBanner: {
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#1f2227',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  logoImage: {
    width: width * 0.7, 
    height: 100,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginTop: 10,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#ff4444',
    marginTop: 12,
    borderRadius: 2,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFCB05', 
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#ccc',
    lineHeight: 22,
    textAlign: 'justify',
  },
  infoCard: {
    backgroundColor: '#2c3138',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  companyCard: {
    backgroundColor: '#2c3138',
    padding: 15,
    borderRadius: 12,
  },
  companyText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statBox: {
    backgroundColor: '#3d444d',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
  },
  cardItem: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    marginTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
    fontSize: 12,
  },
});