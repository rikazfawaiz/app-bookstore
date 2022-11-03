import mongoose from "mongoose";

const url = [
    'mongodb://localhost:27017/bookstore']
mongoose.connect(url[0], {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

export default db;
