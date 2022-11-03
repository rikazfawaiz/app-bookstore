import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style.css';

function BookList() {
  const [books, setBook] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const response = await axios.get('http://localhost:5000/books');
    setBook(response.data);
  }

  const deleteBook = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="has-text-left ml-4 mr-4">
      <Link to={'/'} className='button is-info mt-5'>Go to Products</Link>
      <Link to={'/books/add'} className='button is-info mt-5 ml-5'>Add Book</Link>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.publisher}</td>
              <td>{book.year}</td>
              <td>{book.isbn}</td>
              <td>{book.stock}</td>
              <td>{book.rating}</td>
              <td>{book.image}</td>
              <td><a href={book.url}>{book.url}</a></td>
              <th>
                <Link to={`/books/edit/${book._id}`} className='button is-info'>Edit</Link>
                <button onClick={() => deleteBook(book._id)} className='button is-danger mt-2'>Delete</button> 
              </th>
            </tr>
          ))}
          </tbody>
        </table>
      </div> 
    </div>
  )
}

export default BookList