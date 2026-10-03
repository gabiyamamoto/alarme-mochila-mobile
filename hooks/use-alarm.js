import { useState, useEffect, useRef } from "react"; //O useRef serve para guardar um valor ou uma referência de um componente que persiste entre as renderizações sem causar uma nova renderização (re-render) na tela
import { useAudioPlayer } from "expo-audio";
import { Accelerometer } from "expo-sensors";
import * as Location from "expo-location";
import NetInfo from "@react-native-community/netinfo";

const PIN_CORRETO = "1234";
const SEGUNDOS_CONTAGEM = 60;

export function useAlarm() {
  const [dados, setDados] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [magnitude, setMagnitude] = useState(1);
  const [estado, setEstado] = useState("desarmado");
  const [segundos, setSegundos] = useState(SEGUNDOS_CONTAGEM);
  const [pin, setPin] = useState("");
  const [pinErrado, setPinErrado] = useState(false);
  const [limite, setLimite] = useState(0.5); //seta o limite q dispara o alarme, se a magnitude for maior q 0.5 dispara o alarme
  const [online, setOnline] = useState(true);
  const [fila, setFila] = useState([]);
  const [log, setLog] = useState([]);
  const player = useAudioPlayer(require("../assets/sirene.mp3"));
  const estadoRef = useRef(estado);
  estadoRef.current = estado;

  const addLog = (msg) => {
    setLog((l) =>
      [
        { hora: new Date().toLocaleTimeString().slice(0, 5), msg },
        ...l,
      ].slice(0, 5),
    );
  };

  function armar() {
    setPin("");
    setEstado("armado");
    addLog("Alarme armado!");
  }

  function desarmarDireto() {
    setEstado("desarmado");
  }

  function iniciarContagem() {
    setSegundos(SEGUNDOS_CONTAGEM);
    setEstado("contagem");
    addLog("Movimento detectado!");
  }

  function desarmarComPin() {
    if (pin === PIN_CORRETO) {
      player.pause();
      setEstado("desarmado");
      setPin("");
      setPinErrado(false);
      addLog("Desarmado com PIN!");
    } else {
      setPin("");
      setPinErrado(true);
    }
  }

  function aumentarSensibilidade() {
    setLimite((l) => Math.max(0.1, +(l - 0.1).toFixed(1)));
  }

  function diminuirSensibilidade() {
    setLimite((l) => Math.min(1, +(l + 0.1).toFixed(1)));
  }

  function limparPinErrado() {
    setPinErrado(false);
  }

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const sub = Accelerometer.addListener(({ x, y, z }) => {
      setDados({ x, y, z });
      const mag = Math.sqrt(x * x + y * y + z * z); //parado = 1g
      setMagnitude(mag);
      if (estadoRef.current === "armado" && Math.abs(mag - 1) > limite) {
        iniciarContagem();
      }
    });
    return () => sub.remove();
  }, [limite]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setOnline(!!state.isConnected),
    ); //Se s.isConnected for true, !!true continua true.
    // Se for undefined ou null, !!undefined vira false
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (online && fila.length > 0) {
      fila.forEach((aviso) => addLog(`Àviso enviado (fila): ${aviso}`));
      setFila([]);
    }
  }, [online, fila]);

  useEffect(() => {
    if (estado === "contagem") return;
    if (segundos <= 0) {
      dispararAlarme();
      return;
    }
    const timer = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [estado, segundos]);

  async function dispararAlarme() {
    setEstado("tocando");
    player.loop = true;
    player.seekTo(0);
    player.play();

    let localizacao = "localização indisponível";
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const pos = await Location.getCurrentPositionAsync({});
        localizacao = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }

    const aviso = `Sua mochila foi mexida! Local: ${localizacao}`;
    if (online) {
      addLog(`Aviso enviado: ${aviso}`); // envio simulado
    } else {
      setFila((f) => [...f, aviso]);
      addLog(`Sem internet: aviso adicionado à fila: ${aviso}`);
    }
  }

  return {
    dados,
    magnitude,
    estado,
    segundos,
    pin,
    pinErrado,
    limite,
    online,
    log,
    fila,
    armar,
    desarmarDireto,
    desarmarComPin,
    aumentarSensibilidade,
    diminuirSensibilidade,
    limparPinErrado,
    setPin,
  }
}
