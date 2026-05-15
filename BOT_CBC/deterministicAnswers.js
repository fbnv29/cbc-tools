export function getDeterministicAnswer(question, databaseResult, options = {}) {
  const text = normalize(question);
  const channels = getRows(databaseResult, "channels");
  const songs = getRows(databaseResult, "cbc_click_songs");

  const qmixAnswer = answerQmix(text);
  if (qmixAnswer) {
    return qmixAnswer;
  }

  if (asksDirectTeamDirectoryQuestion(text)) {
    return "Esa información la uso como contexto interno para validar asignaciones. Si tienes una planificación u orden específico, pásamelo y lo reviso.";
  }

  if (asksForMonitor(text)) {
    return answerMonitor(question, channels);
  }

  const bpm = getRequestedBpm(text);
  if (bpm) {
    return answerSongsByBpm(songs, bpm);
  }

  if (asksForSongList(text)) {
    return answerSongList(songs);
  }

  return null;
}

function asksDirectTeamDirectoryQuestion(text) {
  return (
    text.includes("que toca") ||
    text.includes("quien toca") ||
    text.includes("quienes tocan") ||
    text.includes("que instrumento toca") ||
    text.includes("quienes pueden tocar") ||
    text.includes("lista de integrantes")
  );
}

function answerQmix(text) {
  const asksQmix = text.includes("qmix") || text.includes("retorno") || text.includes("retornos");
  if (!asksQmix) return null;

  if (
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("red") ||
    text.includes("clave") ||
    text.includes("contrasena")
  ) {
    return "Conéctate a la red audio. La contraseña es audio1234.";
  }

  if (
    text.includes("no puedo controlar") ||
    text.includes("no me deja controlar") ||
    text.includes("no funciona") ||
    text.includes("autorizar") ||
    text.includes("autorizacion")
  ) {
    return "Revisa que el canal superior de QMix coincida con tu retorno. Si es la primera vez o no puedes controlarlo, pide al encargado de consola que autorice ese canal.";
  }

  if (text.includes("iphone") || text.includes("ios")) {
    return "En iPhone puedes cambiar el nombre del dispositivo en la configuración de QMix para que la consola te identifique más rápido.";
  }

  if (
    text.includes("horizontal") ||
    text.includes("pantalla") ||
    text.includes("no veo") ||
    text.includes("canales")
  ) {
    return "Activa el giro automático del celular y usa QMix en horizontal para ver mejor todos los canales.";
  }

  if (
    text.includes("conecto") ||
    text.includes("conectar") ||
    text.includes("configurar") ||
    text.includes("usar") ||
    text.includes("abrir")
  ) {
    return "Instala QMix, conéctate a la red audio con contraseña audio1234, abre la app, selecciona la consola y verifica que el canal superior coincida con tu retorno asignado.";
  }

  return null;
}

function answerMonitor(question, channels) {
  const personName = extractPersonName(question);
  if (!personName) {
    return "Dime tu nombre para buscar tu monitor.";
  }

  const normalizedName = normalize(personName);
  const matches = channels.filter((channel) => {
    const type = normalize(channel.type ?? "");
    const name = normalize(channel.name ?? "");
    return type === "output" && name.includes(normalizedName);
  });

  if (matches.length === 0) {
    return `No encuentro un monitor asignado a ${personName}.`;
  }

  if (matches.length > 1) {
    const list = matches
      .map((channel) => `canal ${channel.channel_number} (${channel.name})`)
      .join(", ");
    return `Encontré más de un monitor para ${personName}: ${list}.`;
  }

  return `${formatName(personName)}, tu monitor es el canal ${matches[0].channel_number}.`;
}

function answerSongList(songs) {
  if (songs.length === 0) {
    return "No encuentro canciones registradas.";
  }

  return songs.map((song, index) => `${index + 1}. ${formatSong(song)}`).join("\n");
}

function answerSongsByBpm(songs, bpm) {
  const matches = songs.filter((song) => Number(song.bpm) === bpm);
  if (matches.length === 0) {
    return `No encuentro canciones registradas en ${bpm} BPM.`;
  }

  return matches.map((song, index) => `${index + 1}. ${formatSong(song)}`).join("\n");
}

function getRows(databaseResult, tableName) {
  return databaseResult.tables?.find((table) => table.name === tableName)?.rows ?? [];
}

function asksForMonitor(text) {
  return text.includes("monitor");
}

function asksForSongList(text) {
  return (
    text.includes("lista de canciones") ||
    text.includes("canciones disponibles") ||
    text === "canciones" ||
    text.includes("dame canciones")
  );
}

function getRequestedBpm(text) {
  const match = text.match(/\b(\d{2,3})\s*bpm\b/);
  if (!match) return null;
  return Number(match[1]);
}

function extractPersonName(question) {
  const match = question.match(/\b(?:soy|me llamo|mi nombre es)\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)\b/);
  return match?.[1] ?? null;
}

function formatSong(song) {
  const title = song.title ?? song.name ?? song.song_name ?? "Canción sin nombre";
  const artist = song.artist ? ` - ${song.artist}` : "";
  const bpm = song.bpm ? ` - ${song.bpm} BPM` : "";
  return `${title}${artist}${bpm}`;
}

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function normalize(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
