import express from 'express';
import cors from 'cors';
import upload from 'express-fileupload';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Routes from './routes/Routes.js';
import database from './configs/database.js';

dotenv.config();
const app = express();

database;

app.use(cookieParser());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(upload());
app.use(express.static('public'));
app.use(Routes);

app.listen(5000, () => console.log('Server running in http://localhost:5000'));