import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';

dotenv.config();
const corsOption = {
  origin: '*',
};
const app = express();
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 10010;

app.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
