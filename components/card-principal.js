import { StyleSheet, Switch, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cores } from "./../constants/cores";


export function CardPrincipal({ armado, onAlternar }) {
    return (
        <View style={styles.cardPrincipal}>

            <View style={styles.iconeCirculo}>
                <MaterialCommunityIcons name={armado ? "bag-personal" : "bag-personal-off-outline"}
                    size={64}
                    color={cores.roxo}
                />
            </View>

            <Text style={styles.cardTitulo}>
                {armado ? "Mochila protegida" : "Alarme desligado"}
            </Text>
            <Text style={styles.cardSub}>
                {armado ? "Acelerômetro ativo" : "Ligue para armar o alarme"}
            </Text>

            <Switch
                value={armado}
                onValueChange={onAlternar}
                trackColor={{ false: "#33456f", true: cores.salmao }}
                thumbColor={"#f3f0ff"}
                style={{
                    marginTop: 14,
                    transform: [{ scale: 1.25 }]
                }}
            />
        </View>
    );
}


export function LeituraSensores({ dados, magnitude }) {
    return (
        <View style={styles.linhaInfo}>
            <Leitura rotulo="x"
                valor={dados.x} />
            <Leitura rotulo="y"
                valor={dados.y} />
            <Leitura rotulo="z"
                valor={dados.z} />
            <Leitura rotulo="mag"
                valor={magnitude} />
        </View>
    );
}

function Leitura({rotulo, valor}) {
    return (
        <View style={styles.leitura}>
            <Text style={styles.leituraValor}>
                {valor.toFixed(2)}
            </Text>
            <Text style={styles.leituraRotulo}> {rotulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardPrincipal: {
        backgroundColor: cores.card,
        borderRadius: 28,
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },

    iconeCirculo: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: cores.cardClaro,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    cardTitulo: {
        fontSize: 22,
        fontWeight: '700',
        color: cores.texto
    },
    cardSub: {
        fontSize: 14,
        color: cores.textoSuave,
        marginTop: 2,
    },
    linhaInfo: {
        flexDirection: "row",
        gap: 8,
    },
    leitura: {
        flex: 1,
        backgroundColor: cores.Card,
        borderRadius: 16,
        paddingVertical: 10,
        alignItems: "center",
    },
    leituraValor: {
        fontSize: 15,
        fontWeight: "700",
        color: cores.texto,
    },
    leituraRotulo: {
        fontSize:12,
        color:cores.textoSuave,
        marginTop: 2,
    },
})