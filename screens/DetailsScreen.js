import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
    const { pokemon } = route.params;
    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState(null);

    const fetchPokemonDetail = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const json = await res.json();
            setPokemonData(json);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonDetail();
    }, []);

    if (loading || !pokemonData) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" style={styles.loader} />
            </View>
        );
    }

    const { sprites, height, weight, types, abilities } = pokemonData;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: sprites.front_default }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Altura:</Text>
                <Text style={styles.value}>{height / 10} m</Text>

                <Text style={styles.label}>Peso:</Text>
                <Text style={styles.value}>{weight / 10} kg</Text>

                <Text style={styles.label}>Tipos:</Text>
                <Text style={styles.value}>
                    {types.map(t => t.type.name).join(', ')}
                </Text>

                <Text style={styles.label}>Habilidades:</Text>
                <Text style={styles.value}>
                    {abilities.map(a => a.ability.name).join(', ')}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
        borderRadius: 12,
        elevation: 3,
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 12,
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
});
