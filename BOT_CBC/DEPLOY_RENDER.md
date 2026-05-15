# Deploy de BOT_CBC en Render

Usa el boton del README:

https://render.com/deploy?repo=https://github.com/fbnv29/cbc-tools

Render leera `render.yaml` desde la raiz del repo y creara el servicio `bot-cbc`.

## Variables necesarias

Estas variables se copian desde tu `.env` local, pero no se suben a GitHub:

```txt
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_READABLE_TABLES=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
```

No agregues `PORT`. Render lo define automaticamente.

## Prueba

Cuando termine el deploy, abre:

```txt
https://TU-SERVICIO.onrender.com/healthz
```

Debe responder:

```json
{"ok":true,"service":"bot-cbc"}
```

Despues abre la URL raiz del servicio para usar el chat.
