// ============================================================
// DATOS MOCK — 32 canales de entrada + 16 canales de salida
// Presonus StudioLive 32 Series
// ============================================================

export const CATEGORIES = {
  voice:   { label: 'Voz',        color: 'voice',   emoji: '🎤' },
  guitar:  { label: 'Guitarra',   color: 'guitar',  emoji: '🎸' },
  drums:   { label: 'Batería',    color: 'drums',   emoji: '🥁' },
  bass:    { label: 'Bajo',       color: 'bass',    emoji: '🎵' },
  keys:    { label: 'Teclado',    color: 'keys',    emoji: '🎹' },
  monitor: { label: 'Monitor',    color: 'monitor', emoji: '📢' },
  fx:      { label: 'FX / Aux',   color: 'fx',      emoji: '🎛️' },
  default: { label: 'Sin asignar', color: 'default', emoji: '—' },
};

// 32 Canales de Entrada
export const mockInputChannels = [
  { id: 'in-1',  channel_number: 1,  type: 'input', name: 'Voz Líder',        description: 'SM58 – Lead singer principal',  category: 'voice',   is_active: true },
  { id: 'in-2',  channel_number: 2,  type: 'input', name: 'Voz Coro 1',       description: 'SM58 – Armoniía izquierda',    category: 'voice',   is_active: true },
  { id: 'in-3',  channel_number: 3,  type: 'input', name: 'Voz Coro 2',       description: 'SM58 – Armonía derecha',       category: 'voice',   is_active: true },
  { id: 'in-4',  channel_number: 4,  type: 'input', name: 'Voz Coro 3',       description: '',                             category: 'voice',   is_active: false },
  { id: 'in-5',  channel_number: 5,  type: 'input', name: 'Guitarra Líder',   description: 'Axe-FX III – XLR izq.',        category: 'guitar',  is_active: true },
  { id: 'in-6',  channel_number: 6,  type: 'input', name: 'Guitarra Líder R', description: 'Axe-FX III – XLR der.',        category: 'guitar',  is_active: true },
  { id: 'in-7',  channel_number: 7,  type: 'input', name: 'Guitarra Rítmica', description: 'HX Stomp – Directo',           category: 'guitar',  is_active: true },
  { id: 'in-8',  channel_number: 8,  type: 'input', name: 'Guitarra Acústica',description: 'DI Box – Fishman',             category: 'guitar',  is_active: false },
  { id: 'in-9',  channel_number: 9,  type: 'input', name: 'Bajo',             description: 'Aguilar Tone Hammer – DI',     category: 'bass',    is_active: true },
  { id: 'in-10', channel_number: 10, type: 'input', name: 'Bajo DI',          description: 'Backup pasivo',                category: 'bass',    is_active: false },
  { id: 'in-11', channel_number: 11, type: 'input', name: 'Kick In',          description: 'AKG D112 – Interior bombo',    category: 'drums',   is_active: true },
  { id: 'in-12', channel_number: 12, type: 'input', name: 'Kick Out',         description: 'Shure Beta 91A – Exterior',    category: 'drums',   is_active: true },
  { id: 'in-13', channel_number: 13, type: 'input', name: 'Snare Top',        description: 'Shure SM57 – Arriba',          category: 'drums',   is_active: true },
  { id: 'in-14', channel_number: 14, type: 'input', name: 'Snare Bottom',     description: 'SM57 – Abajo (fase inversa)',  category: 'drums',   is_active: true },
  { id: 'in-15', channel_number: 15, type: 'input', name: 'Hi-Hat',           description: 'AKG C451',                     category: 'drums',   is_active: true },
  { id: 'in-16', channel_number: 16, type: 'input', name: 'Tom 1',            description: 'Sennheiser e604',              category: 'drums',   is_active: true },
  { id: 'in-17', channel_number: 17, type: 'input', name: 'Tom 2',            description: 'Sennheiser e604',              category: 'drums',   is_active: true },
  { id: 'in-18', channel_number: 18, type: 'input', name: 'Tom 3 / Floor',    description: 'Sennheiser e604',              category: 'drums',   is_active: true },
  { id: 'in-19', channel_number: 19, type: 'input', name: 'Overhead L',       description: 'AKG C214 – Izquierda',         category: 'drums',   is_active: true },
  { id: 'in-20', channel_number: 20, type: 'input', name: 'Overhead R',       description: 'AKG C214 – Derecha',           category: 'drums',   is_active: true },
  { id: 'in-21', channel_number: 21, type: 'input', name: 'Keys L',           description: 'Nord Stage 3 – Out L',         category: 'keys',    is_active: true },
  { id: 'in-22', channel_number: 22, type: 'input', name: 'Keys R',           description: 'Nord Stage 3 – Out R',         category: 'keys',    is_active: true },
  { id: 'in-23', channel_number: 23, type: 'input', name: 'Keys 2 / Pad',     description: 'Roland Integra-7',             category: 'keys',    is_active: false },
  { id: 'in-24', channel_number: 24, type: 'input', name: 'Percusión',        description: 'Cajon / Shaker – DI',          category: 'drums',   is_active: false },
  { id: 'in-25', channel_number: 25, type: 'input', name: 'Click / Track',    description: 'Ableton – Bus Click',          category: 'default', is_active: false },
  { id: 'in-26', channel_number: 26, type: 'input', name: 'Playback L',       description: 'Ableton – Pistas L',           category: 'fx',      is_active: false },
  { id: 'in-27', channel_number: 27, type: 'input', name: 'Playback R',       description: 'Ableton – Pistas R',           category: 'fx',      is_active: false },
  { id: 'in-28', channel_number: 28, type: 'input', name: 'Aux Externo L',    description: '',                             category: 'default', is_active: false },
  { id: 'in-29', channel_number: 29, type: 'input', name: 'Aux Externo R',    description: '',                             category: 'default', is_active: false },
  { id: 'in-30', channel_number: 30, type: 'input', name: 'Libre 30',         description: '',                             category: 'default', is_active: false },
  { id: 'in-31', channel_number: 31, type: 'input', name: 'Libre 31',         description: '',                             category: 'default', is_active: false },
  { id: 'in-32', channel_number: 32, type: 'input', name: 'Libre 32',         description: '',                             category: 'default', is_active: false },
];

// 16 Canales de Salida (Monitores/Auxes)
export const mockOutputChannels = [
  { id: 'out-1',  channel_number: 1,  type: 'output', name: 'MON – Vocalista',  description: 'Wedge frontal cantante',       category: 'monitor', is_active: true },
  { id: 'out-2',  channel_number: 2,  type: 'output', name: 'MON – Coros',      description: 'Monitor coro izquierda',       category: 'monitor', is_active: true },
  { id: 'out-3',  channel_number: 3,  type: 'output', name: 'MON – Batería',    description: 'In-ear baterista',             category: 'monitor', is_active: true },
  { id: 'out-4',  channel_number: 4,  type: 'output', name: 'MON – Guitarra L', description: 'Wedge guitarrista líder',      category: 'monitor', is_active: true },
  { id: 'out-5',  channel_number: 5,  type: 'output', name: 'MON – Guitarra R', description: 'Wedge guitarrista rítmico',    category: 'monitor', is_active: true },
  { id: 'out-6',  channel_number: 6,  type: 'output', name: 'MON – Bajo',       description: 'Monitor bajista',             category: 'monitor', is_active: true },
  { id: 'out-7',  channel_number: 7,  type: 'output', name: 'MON – Teclados',   description: 'Monitor tecladista',          category: 'monitor', is_active: true },
  { id: 'out-8',  channel_number: 8,  type: 'output', name: 'MON – Libre',      description: '',                            category: 'monitor', is_active: false },
  { id: 'out-9',  channel_number: 9,  type: 'output', name: 'AUX – FOH L',      description: 'Salida L sala principal',     category: 'fx',      is_active: true },
  { id: 'out-10', channel_number: 10, type: 'output', name: 'AUX – FOH R',      description: 'Salida R sala principal',     category: 'fx',      is_active: true },
  { id: 'out-11', channel_number: 11, type: 'output', name: 'AUX – Grabación L',description: 'Interface grabación izq.',    category: 'fx',      is_active: false },
  { id: 'out-12', channel_number: 12, type: 'output', name: 'AUX – Grabación R',description: 'Interface grabación der.',    category: 'fx',      is_active: false },
  { id: 'out-13', channel_number: 13, type: 'output', name: 'AUX – Streaming',  description: 'Salida para stream OBS',      category: 'fx',      is_active: false },
  { id: 'out-14', channel_number: 14, type: 'output', name: 'AUX – Subgrupo',   description: '',                            category: 'default', is_active: false },
  { id: 'out-15', channel_number: 15, type: 'output', name: 'AUX – Libre 15',   description: '',                            category: 'default', is_active: false },
  { id: 'out-16', channel_number: 16, type: 'output', name: 'AUX – Libre 16',   description: '',                            category: 'default', is_active: false },
];

export const allMockChannels = [...mockInputChannels, ...mockOutputChannels];
