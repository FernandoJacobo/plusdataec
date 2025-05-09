import express from 'express';
import bodyParser from  'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import path from 'path';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use('/public', express.static(path.join(__dirname)));

app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
