import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, SetPrice] = useState(0);
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(0);
    const [isbn, setISBN] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [rating, setRating] = useState(0);
    const [stock, setStock] = useState(0);
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const getBookById = async() => {
            const response = await axios.get(`http://localhost:5000/books/${id}`);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            SetPrice(response.data.price);
            setPublisher(response.data.publisher);
            setYear(response.data.year);
            setFile(response.data.image);
            setISBN(response.data.isbn);
            setPreview(response.data.url);
            setRating(response.data.rating);
            setStock(response.data.stock);
        }
        getBookById();
    }, [id]);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }


    const updateBook = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("price", price);
        formData.append("publisher", publisher);
        formData.append("year", year);
        formData.append("image", file);
        formData.append("isbn", isbn);
        formData.append("rating", rating);
        formData.append("stock", stock);

        try {
            await axios.patch(`http://localhost:5000/books/edit/${id}`, formData, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            });
            navigate('/books');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns">
            <div className="column is-half">
                <form onSubmit={updateBook} encType='multipart/form-data'>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder='Title'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}  
                            placeholder='Author'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input type="number" 
                            className="input" 
                            value={price}
                            onChange={(e) => SetPrice(e.target.value)} 
                            placeholder='Price'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Publisher</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}  
                            placeholder='Publisher'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Year</label>
                        <div className="control">
                            <input type="number" 
                            className="input"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}  
                            placeholder='Year'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">ISBN</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={isbn}
                            onChange={(e) => setISBN(e.target.value)}  
                            placeholder='ISBN'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className='label'>Image</label>
                        <div className="control">
                            <input type="file"
                            onChange={loadImage}/>
                        </div>
                    </div>

                    {preview ? (
                        <figure className='image is-128x128'>
                            <img src={preview} alt="Preview_Image" />
                        </figure>
                    ) : (
                        ""
                    )}

                    <div className="field">
                        <div className="control" required>
                            <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='column is-one-quarter'>
                <form onSubmit={updateBook} encType='multipart/form-data'>
                    <div className="field">
                        <label className="label">Rating</label>
                        <div className="control">
                            <input type="number" 
                            className="input" 
                            value={rating}
                            onChange={(e) => setRating(e.target.value)} 
                            placeholder='Rating'
                            required/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Stock</label>
                        <div className="control">
                            <input type="number" 
                            className="input" 
                            value={stock}
                            onChange={(e) => setStock(e.target.value)} 
                            placeholder='Stock'
                            required/>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditBook