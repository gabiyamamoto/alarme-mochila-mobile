import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cores } from "../constants/cores";

export function PainelAlerta({ tocando, segundos, pin, onMudarPin, pinErrado, onDesarmar }) {
    const pulso = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        pulso.setValue(0);

        const animacao = Animated.loop(
            Animated.timing(pulso, {
                toValue: 1,
                duration: 1600,
                useNativeDriver: true,
            }),
        );

        animacao.start();

        return () => animacao.stop();
    }, []);

    const anel = (atraso) => ({
        transform: [
            {
                scale: pulso.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1 + atraso * 0.25, 1.9 + atraso * 0.25],
                }),
            },
        ],
        opacity: pulso.interpolate({
            inputRange: [0, 1],
            outputRange: [0.35, 0],
        }),
    });

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.topo}>Alerta!</Text>

                <View style={styles.aneisArea}>
                    <Animated.View style={[styles.anel, anel(0)]} />
                    <Animated.View style={[styles.anel, anel(1)]} />

                    <View style={styles.circulo}>
                        <MaterialCommunityIcons
                            name="bag-personal"
                            size={72}
                            color="#fff"
                        />
                    </View>
                </View>

                <Text>{tocando ? "O aviso com a localização foi enviado ao dono." : `Digite o PIN em ${segundos}s ou a sirene vai tocar.`}</Text>

                <TextInput
                    style={[
                        styles.pinInput,
                        pinErrado && { borderColor: cores.alertaCirculo },
                    ]}
                    placeholder="PIN"
                    placeholderTextColor="#c99aae"
                    value={pin}
                    onChangeText={onMudarPin}
                    keyboardType="number-pad"
                    secureTextEntry
                    maxLength={4}
                />

                {pinErrado && (
                    <Text style={styles.pinErro}>PIN incorreto. Tente de novo.</Text>
                )}

                <Pressable style={styles.botao} onPress={onDesarmar}>
                    <Text style={styles.botaoTexto}>Desarmar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    conteudo: {
        flex: 1,
        alignItems: "center",
        padding: 24,
    },

    topo: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },

    aneisArea: {
        width: 260,
        height: 260,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 24,
    },

    anel: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: cores.alertaCirculo,
    },

    circulo: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: cores.alertaCIrculo,
        alignItems: "center",
        justifyContent: "center",
    },

    titulo: {
        fontSize: 26,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
    },

    texto: {
        fontSize: 15,
        color: "#f2c7d3",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 20,
    },

    pinInput: {
        width: 160,
        borderWidth: 1.5,
        borderColor: "#8a4a63",
    },
})