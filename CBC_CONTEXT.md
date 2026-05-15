# CBC Tools Context

Fecha de contexto: 2026-05-15

## Vision general

`CBC_Tools` debe funcionar como un ecosistema web para la iglesia CBC, con foco inicial en el ministerio de alabanza, sonido y futura integracion con multimedia. La carpeta raiz actua como matriz: desde ahi se entra a herramientas independientes, pero visualmente conectadas.

## Principios de trabajo

- Mantener cada herramienta independiente para que pueda evolucionar, desplegarse o repararse sin romper las demas.
- Usar un lenguaje visual comun inspirado en `CHANELS_CBC`: interfaz dark audio, tecnica, sobria, con tarjetas compactas, bordes finos, tipografia fuerte y acentos tipo LED.
- Centralizar contexto, proposito y decisiones en este archivo antes de cambios grandes.
- Evitar mezclar backends y frontends entre herramientas salvo que se defina una capa comun explicita.

## Herramientas actuales

### Portal raiz

- Archivos: `index.html`, `portal.css`.
- Rol: front-end principal de seleccion de herramientas.
- Tipo: estatico, sin build.
- Debe servir como puerta de entrada y mapa del ecosistema.
- Decision visual actual: mantenerlo muy simple para usuarios finales; mostrar solo marca, titulo principal y accesos directos a las aplicaciones. La informacion tecnica queda documentada en este archivo, no expuesta en el portal.

### CHANELS_CBC

- Stack: React + Vite + Supabase.
- Comando local: `npm run dev` dentro de `CHANELS_CBC`.
- URL publica actual: `https://canales-cbc.netlify.app`.
- Rol: mapa de canales, entradas y monitores para sonido/alabanza.
- Estado visual: es la referencia grafica principal del ecosistema.
- Notas:
  - Tiene vista publica y administracion.
  - Mantener su identidad "dark audio / StudioLive".
  - No acoplar directamente al portal; el portal solo la enlaza.

### MET_CBC

- Stack: HTML/CSS/JS estatico, PWA.
- Entrada: `MET_CBC/index.html`.
- Rol: metronomo/click en vivo con setlist, BPM, compas, transporte, MIDI/audio y datos de canciones.
- Notas:
  - Puede abrirse como app independiente.
  - Tiene `manifest.webmanifest` y `service-worker.js`.
  - Usa marca CBC en `MET_CBC/assets/cbc-mark.png`.

### BOT_CBC

- Stack: Node.js + Express + Supabase + Gemini/IA + interfaz web estatica servida desde `public`.
- Comando local: `npm start` dentro de `BOT_CBC`.
- URL local esperada: `http://localhost:3000`.
- Deploy preparado: `render.yaml` en la raiz configura un servicio Render llamado `bot-cbc`.
- Rol: asistente de consulta para informacion autorizada del ministerio.
- Notas:
  - La interfaz web depende del backend para `/api/chat`.
  - No debe exponerse ninguna clave sensible en frontend.
  - La carpeta `knowledge/` guarda conocimiento base y reglas de respuesta.

## Direccion visual comun

- Fondo base: negro/carbón profundo.
- Superficies: gris oscuro con bordes sutiles.
- Acentos: verde LED, teal CBC, naranja CBC y azul CBC.
- Componentes: tarjetas rectangulares con radio pequeno, estilo rack/audio.
- Jerarquia: nombres de herramientas en mayusculas o peso fuerte; metadata tecnica en mono o texto pequeno.
- Evitar estilos decorativos que parezcan landing page generica.

## Proximos pasos sugeridos

- Repositorio preparado para GitHub con `.gitignore` raiz, `README.md`, `package.json` de scripts y `.env.example` por modulo con variables sensibles fuera del repo.
- Crear una estrategia de ejecucion local unificada desde raiz, por ejemplo scripts para levantar portal, `CHANELS_CBC` y `BOT_CBC`.
- Definir si el despliegue final sera:
  - apps separadas por subdominio/ruta, o
  - un solo hosting que sirva builds estaticos y proxyee el bot.
- Extraer tokens visuales comunes a un archivo compartido cuando haya mas herramientas.
- Documentar variables de entorno por herramienta sin guardar secretos reales.
