# LegalFácil

Asistente legal que proporciona respuestas claras y modelos de texto para consultas legales y administrativas.

## Estructura del Proyecto

- `client`: Frontend desarrollado con React
- `server`: Backend desarrollado con Node.js y Express

## Requisitos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

### Cliente

```bash
cd legal-facil/client
npm install
npm run dev
```

### Servidor

```bash
cd legal-facil/server
npm install
```

Crea un archivo `.env` en el directorio del servidor con el siguiente contenido:

```
OPENAI_API_KEY=tu_api_key_aqui
PORT=4000
```

Luego inicia el servidor:

```bash
npm run dev
```

## Uso

1. Abre tu navegador en `http://localhost:3000`
2. Escribe tu consulta legal o administrativa
3. Recibe una respuesta clara y un modelo de texto que puedes utilizar

## Despliegue

### Cliente

El cliente puede ser desplegado en plataformas como Vercel, Netlify o GitHub Pages.

### Servidor

El servidor puede ser desplegado en plataformas como Render, Heroku o Railway.

## Licencia

Este proyecto está bajo la Licencia MIT.