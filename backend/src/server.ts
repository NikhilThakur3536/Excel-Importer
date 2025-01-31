
import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import { errorHandler } from './middleware/errorHandler';
import './config/db';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/files', fileRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});