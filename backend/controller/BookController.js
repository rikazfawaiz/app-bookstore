import Book from '../models/Books.js';
import path from 'path';
import fs from 'fs';

export const getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({mesage: error.message});
    }
}

export const getBooksByTitle = async(req, res) => {
    try {
        const title = new RegExp(req.params.title, 'i')
        const books = await Book.find({title: {$regex : title}})
        res.json(books);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getBookById = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(404).json({mesage: error.message});
    }
}

export const saveBook = (req, res) => {
    if (req.files === null) return res.status(400).json({message: 'No file Uploaded'});
    
    const book = new Book(req.body);
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({message: 'Invalid Image'});
    if(fileSize > 5000000) return res.status(422).json({message: 'Image must be less 5MB'});

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(422).json({message: err.message});

        try {
            book['image'] = fileName;
            book['url'] = url;
            const insertBook = await book.save();
            res.status(201).json(insertBook);
        } catch (error) {
            res.status(400).json({mesage: error.message});
        }
    })
}

export const updateBook = async(req, res) => {
    const book = await Book.findById(req.params.id);

    if(!book) return res.status(404).json({message: "No Data Found"});

    let fileName = "", url = "";
    if(req.files === null) {
        fileName = Book.image;
    } else {
        const file = req.files.image;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({message: 'Invalid Image'});
        if(fileSize > 5000000) return res.status(422).json({message: 'Image must be less 5MB'});
    
        const filepath = `./public/images/${book.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(422).json({message: err.message});
        });
    }

    try {
        await Book.updateOne({_id:req.params.id}, {$set: req.body, image: fileName, url: url});
        res.status(200).json({message: 'Data Updated'});
    } catch (error) {
        res.status(400).json({mesage: error.message});
    }

}

export const deleteBook = async(req, res) => {
    const book = await Book.findById(req.params.id);

    if(!book) return res.status(404).json({message: "No Data Found"});
    
    try {
        const filepath = `./public/images/${book.image}`;
        fs.unlinkSync(filepath);
        await Book.deleteOne({_id:req.params.id});
        res.status(200).json({message: 'Data Deleted Success'});
    } catch (error) {
        res.status(400).json({mesage: error.message});
    }
}