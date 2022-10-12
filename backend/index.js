import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import BookRoute from './routes/BookRoute.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());
app.use(BookRoute);

app.listen(5000, () => console.log('Server running in http://localhost:5000'));