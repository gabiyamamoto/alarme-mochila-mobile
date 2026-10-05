import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import {cores} from "../constants/cores";

export function CardHistorico({ log }) {
    return (
        <View style={styles.cardHistorico}>
            <View style={styles.historicoTopo}>
                <MaterialCommunityIcons
                name="history"
                size={22}
                color={cores.roxo}
                />
                <Text style={styles.titulo}>Histórico</Text>
        </View>

        {log.length === 0 ? (
            <Text style={styles.subtitulo}>Nada por aqui ainda. </Text>
        ) : (
            log.map((item, i) => (
                <Text key={i} style={styles.logTexto} numberOfLines={1}>
                    {item.hora} {item.msg} 
                    </Text>
            ))
           
        )}
        </View>
    );
}

const styles = StyleSheet = StyleSheet.create({
    cardHistorico: {
        backgroundColor: cores.card,
        borderRadius: 20,
        padding: 16,
        gap: 6,
    },

    historicoTopo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },

    titulo: {
        fontSize: 15,
        fontWeight: "600",
        color: cores.texto,
    },

    subtitulo: {
        fontSize: 15,
        color: cores.textoSuave,
    },

    logTexto: {
        fontSize: 13,
        color: cores.textoSuave,
    },




});