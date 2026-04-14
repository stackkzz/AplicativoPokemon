import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1f2227',
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
                tabBarActiveTintColor: '#ff4444', // Mudado de Amarelo para Vermelho
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#1f2227', //
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="pokeball" size={28} color={color} />
                    ),
                }}
            />
            
            <Tabs.Screen
                name="pokedex"
                options={{
                    title: 'Pokédex',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="tablet-android" size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="toDoList"
                options={{
                    title: 'Missões',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-checks" size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="about"
                options={{
                    title: 'Sobre',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}