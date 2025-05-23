import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import billingCycleRoutes from '../api/billingCycle/billingCycleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/billingCycles', billingCycleRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Erro interno no servidor.' });
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}