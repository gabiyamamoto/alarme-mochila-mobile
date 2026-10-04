import {StyleSheet, Text, View} from 'react-native';
import {cores} from "../constants/cores";

export function LinhaCard({icone, titulo, subtitulo, children}) {
    return (
        <View style={styles.linha}>
           {icone}
           <View style={{flex:1}}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.subtitulo}>{subtitulo}</Text>
           </View>
              {children}
        </View>
    );
}

const styles = StyleSheet.create({
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:12,
        backgroundColor: cores.card,
        borderRadius: 20,
        padding: 16,
    },
    titulo: {
        fontSize: 15,
        fontWeight: "600",
        color: cores.texto,
    },
    subtitulo: {
        fontSize: 13,
        color: cores.textoSuave,
        marginTop: 2,
    }
});