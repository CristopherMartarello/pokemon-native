import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";

export default function PokemonCard({ pokemon, onPress }) {
    const [sprite, setSprite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(pokemon.url);
                const json = await res.json();
                setSprite(json.sprites.front_default);
            } catch (err) {
                console.error("Erro ao carregar sprite:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [pokemon.url]);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Image source={{ uri: sprite }} style={styles.image} />
            )}
            <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});
