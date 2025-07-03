import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import consultarRoute from './routes/consultar.js';

// Configurar dotenv para cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// Verificar que la API key esté disponible
if (!process.env.OPENAI_API_KEY) {
  console.warn('ADVERTENCIA: API key de OpenAI no configurada. Se usarán respuestas locales.');
} else {
  console.log(`API key detectada: ${process.env.OPENAI_API_KEY.substring(0, 10)}...`);
  if (process.env.OPENAI_API_KEY.startsWith('sk-proj-')) {
    console.warn('NOTA: Estás usando una clave de proyecto (sk-proj-). Esto podría causar problemas con la API estándar de OpenAI.');
  }
}

const app = express();
// Configurar CORS para permitir solicitudes desde el frontend desplegado
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://legal-facil.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Ruta de prueba para verificar que el servidor esté funcionando
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.use('/api/consultar', consultarRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.OPENAI_API_KEY ? 'API de OpenAI' : 'Respuestas locales (fallback)'}`);
}); 