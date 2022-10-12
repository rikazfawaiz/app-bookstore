import Book from '../models/BookModel.js';

export const getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({mesage: error.message});
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

export const saveBook = async(req, res) => {
    const book = new Book(req.body);
    try {
        const insertBook = await book.save();
        res.status(201).json(insertBook);
    } catch (error) {
        res.status(400).json({mesage: error.message});
    }
}

export const updateBook = async(req, res) => {
    try {
        const updatedBook = await Book.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({mesage: error.message});
    }
}

export const deleteBook = async(req, res) => {
    try {
        const deletedBook = await Book.deleteOne({_id:req.params.id});
        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(400).json({mesage: error.message});
    }
}