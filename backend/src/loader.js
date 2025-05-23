import database from './config/database.js';
import { startServer } from './config/server.js';

database.then(() => {
  startServer();
}).catch((err) => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});