import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlarme } from "../../hooks/useAlarme";
import { cores } from "../../styles/cores";
import { CardPrincipal, LeituraSensores } from "../../components/card-principal";
import { CardConexao, CardSensibilidade } from "../../components/card-status";
import { CardHistorico } from "../../components/card-historico";
import { PainelAlerta } from "../../components/painel-alerta";

export default function AlarmeMochila() {
  const alarme = useAlarme();

  if (alarme.estado === "tocando") {
    return (
      <PainelAlerta
        tocando={alarme.estado === "tocando"}
        segundos={alarme.segundos}
        pin={alarme.pin}
        onMudarPin={(t) => {
          alarme.setPin(t);
          alarme.limparPinErrado();
        }}
        pinErrado={alarme.pinErrado}
        onDesarmar={alarme.desarmarComPin}
      />
    );
  }

  const armado = alarme.estado === "armado";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Alarme de Mochila</Text>
        <CardPrincipal
          armado={armado}
          onAlternar={(v) => (v ? alarme.armar() : alarme.desarmarDireto())}
        />

        <LeituraSensores dados={alarme.dados} magnitude={alarme.magnitude} />

        <CardConexao online={alarme.online} quantidadeFila={alarme.fila.length} />

        <CardSensibilidade
          limite={alarme.limite}
          onAumentar={alarme.aumentarSensibilidade}
          onDiminuir={alarme.diminuirSensibilidade}
        />

        <CardHistorico log={alarme.log} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: cores.texto,
    textAlign: "center",
    marginBottom: 5,
  },
});
