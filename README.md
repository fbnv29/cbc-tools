# CBC Tools

Portal y ecosistema de herramientas web para la iglesia CBC, orientado al ministerio de alabanza, sonido y futura integracion con multimedia.

## Modulos

- `index.html` + `portal.css`: portal principal estatico.
- `CHANELS_CBC`: app React/Vite para mapa de canales, entradas y monitores.
- `MET_CBC`: PWA estatica para click/metronomo en vivo.
- `BOT_CBC`: backend Express + interfaz web para consultas con IA y Supabase.
- `CBC_CONTEXT.md`: contexto vivo del proyecto y decisiones importantes.

## Requisitos

- Node.js 20 o superior.
- npm.
- Python 3, solo para servir el portal estatico localmente.
- Proyecto Supabase para `CHANELS_CBC` y `BOT_CBC`.
- API key de Gemini para `BOT_CBC`, si se usa la IA.

## Instalacion local

Instala dependencias por modulo:

```bash
npm --prefix CHANELS_CBC install
npm --prefix BOT_CBC install
```

Crea los archivos de entorno desde los ejemplos:

```bash
cp CHANELS_CBC/.env.example CHANELS_CBC/.env
cp BOT_CBC/.env.example BOT_CBC/.env
```

Luego completa las variables reales en cada `.env`.

## Desarrollo

En terminales separadas:

```bash
npm run dev:portal
npm run dev:channels
npm run dev:bot
```

URLs locales:

- Portal: `http://localhost:8080/`
- CHANELS CBC: `http://localhost:5173/`
- BOT CBC: `http://localhost:3000/`
- MET CBC: desde el portal o `http://localhost:8080/MET_CBC/`

## Validacion

```bash
npm run build
npm run lint
```

`npm run build` compila `CHANELS_CBC`. `MET_CBC` y el portal son estaticos. `BOT_CBC` se valida levantando el servidor con `npm run dev:bot`.

## GitHub

Antes de subir:

- No subir archivos `.env`.
- No subir `node_modules`.
- No subir `dist` o builds generados.
- Mantener `CBC_CONTEXT.md` actualizado con decisiones relevantes.
- Si cambia una variable de entorno, actualizar el `.env.example` correspondiente.

Cuando el repositorio remoto exista, se puede inicializar y subir con:

```bash
git init -b main
git add .
git commit -m "Initial CBC Tools workspace"
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```
