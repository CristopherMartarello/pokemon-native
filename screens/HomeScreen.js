import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    ActivityIndicator,
    TextInput,
} from "react-native";
import PokemonCard from "../components/PokemonCard";

export default function HomeScreen({ navigation }) {
    const [pokemons, setPokemons] = useState([]);
    const [countPokemons, setCountPokemons] = useState(0);
    const [filtro, setFiltro] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
            const json = await res.json();
            console.log("Pokemons recebidos:", json);
            setPokemons(json.results);
            setCountPokemons(json.count);
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    };

    const pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filtro.toLowerCase())
    );

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokemons</Text>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar por nome..."
                value={filtro}
                onChangeText={setFiltro}
            />
            <Button title="Recarregar" onPress={fetchPokemons} />

            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : (
                <FlatList
                    data={pokemonsFiltrados}
                    keyExtractor={(item, index) =>
                        item.id?.toString() || index.toString()
                    }
                    renderItem={({ item }) => (
                        <PokemonCard
                            pokemon={item}
                            onPress={() => navigation.navigate("Detalhes", { pokemon: item })}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16,
        backgroundColor: "#f2f2f2",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 10,
        padding: 8,
    },
    loader: {
        marginTop: 20,
    },
});
