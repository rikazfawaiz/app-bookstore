import express from "express";
import { verifyToken } from '../middleware/VerifyToken.js';
import { getBooks, getBookById, getBooksByTitle, saveBook, updateBook, deleteBook } from "../controller/BookController.js";
import { getUser, registerUser, loginUser, logoutUser } from "../controller/UserController.js";
import { refreshToken } from "../controller/RefreshToken.js";



const router = express.Router();

router.get('/books', getBooks);
router.get('/books/search/:title', getBooksByTitle);
router.get('/books/:id', getBookById);
router.post('/books', saveBook);
router.patch('/books/edit/:id', updateBook);
router.delete('/books/:id', deleteBook);

router.get('/users', verifyToken, getUser);
router.post('/users', registerUser);
router.get('/token', refreshToken);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);



export default router;