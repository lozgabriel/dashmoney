import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Validação de variável de ambiente
if (!process.env.MONGO_URI) {
  console.error('Erro: MONGO_URI não definida no arquivo .env');
  process.exit(1);
}

// Conectar ao MongoDB
const database = mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar:', err));

export default database;