import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/BandarBukuLogo.png';
import '../style/style.css';


function ProductList() {

  const [books, setBook] = useState([]);
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function searchBook() {
      if(word !== '') {
        const response = await axios.get(`http://localhost:5000/books/search/${word}`);
        setBook(response.data);
      } else {
        getBooks()
      }
    }
    searchBook();
  }, [word])

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const response = await axios.get('http://localhost:5000/books');
    setBook(response.data);
  }

  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link className="navbar-item" to={'/'}>
                <img src={logo} width="250" height="40" alt="BandarBuku"/>
            </Link>

            <a href='/#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">

                <div className='navbar-item'>
                    <Link to={'/books'}>
                        Books
                    </Link>
                </div>

                <div className="navbar-item has-dropdown is-hoverable">
                    <a href='/#' className="navbar-link">
                        More
                    </a>

                    <div className="navbar-dropdown">
                        <a href='/#' className="navbar-item">
                            About
                        </a>
                    </div> 
                </div> 

                <div className="navbar-item">
                    <form>
                        <div className="field is-grouped">
                            <p className="control is-expanded">
                                <input className="input" 
                                type="text" 
                                placeholder="Search Book"
                                value={word}
                                onChange={(e) => setWord(e.target.value)}/>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <button onClick={Logout} id='btn-logout' className="button is-light">
                      Log Out
                    </button>
                  </div>
                </div>
            </div>
        </div>
      </nav>

      <div className="columns is-multiline">
        {books.map((book) => (
          <div key={book._id} className="column is-one-quarter mt-2">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={book.url} alt="book_image"/>
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5 title-overflow">{book.title}</p>
                    <p className="subtitle is-6">{book.author} {book.year}</p>
                  </div>
                </div>
                <div className="content">
                  {/* <p>ISBN-13 : {book.isbn}</p> */}
                  <p>Rp {book.price}</p>
                </div>
              </div>
              <div className="card-footer">
                <button className='button is-info card-footer-item'>Add</button>
              </div>
            </div>  
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList