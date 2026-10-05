import { Pressable, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {cores} from '../constants/cores';
import {LinhaCard} from './linha-card';

export function CardConexao({online, quantidadeFila}) {
    return (
          <LinhaCard  
          icone={
            <MaterialCommunityIcons
            name={online ? 'wifi' : 'wifi-off'}
            size={24}
            color={online ? cores.roxo : cores.salmao}
            />
          }
          titulo={online ? 'Conectado' : 'Sem internet'}
            subtitulo={
                quantidadeFila > 0 ? `${quantidadeFila} aviso(s) na fila` : 'Nenhum aviso pendente'}
          />
    );
}


export function CardSensibilidade({limite, onAumentar, onDiminuir}) {
    return (
            <LinhaCard
            icone={<MaterialCommunityIcons name="pulse" size={24} color={cores.roxo} />}
            titulo="Sensibilidade"
            subtitulo={`Dispara com variação de ${limite.toFixed(1)} g`}
            >
           <Pressable style={styles.botaoRedondo} onPress={onDiminuir}>
            <MaterialCommunityIcons name="minus" size={20} color={cores.texto} />
          </Pressable>
          <Pressable style={styles.botaoRedondo} onPress={onAumentar}>
            <MaterialCommunityIcons name="plus" size={20} color={cores.texto} />
          </Pressable>
            </LinhaCard>
    );
}

const styles = StyleSheet.create({
    botaoRedondo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: cores.cardClaro,
        alignItems: 'center',
        justifyContent: 'center',

}
});