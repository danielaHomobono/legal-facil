# LegalFácil

Asistente legal que proporciona respuestas en lenguaje claro y sencillo.

## Configuración

### Requisitos
- Node.js (v14 o superior)
- npm

### Configuración del servidor

1. Navega a la carpeta del servidor:
```
cd server
```

2. Instala las dependencias:
```
npm install
```

3. Configura la API key de OpenAI:
   - Edita el archivo `.env` en la carpeta `server`
   - Reemplaza `sk-tu-api-key-de-openai` con tu API key de OpenAI
   - Puedes obtener una API key en [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

4. Inicia el servidor:
```
npm run dev
```

### Configuración del cliente

1. Navega a la carpeta del cliente:
```
cd client
```

2. Instala las dependencias:
```
npm install
```

3. Inicia el cliente:
```
npm run dev
```

4. Abre tu navegador y ve a [http://localhost:5174](http://localhost:5174)

## Uso

1. Escribe tu consulta legal en el campo de texto
2. Haz clic en "Obtener respuesta"
3. Recibirás una explicación clara, un modelo de texto y un consejo adicional

## Notas

- Si no configuras una API key válida de OpenAI, la aplicación usará respuestas locales predefinidas
- Para usar la API de OpenAI, necesitas una API key válida (formato `sk-...`)