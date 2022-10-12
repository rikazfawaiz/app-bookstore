import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, SetPrice] = useState(0);
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getBookById = async() => {
            const response = await axios.get(`http://localhost:5000/books/${id}`);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            SetPrice(response.data.price);
            setPublisher(response.data.publisher);
            setYear(response.data.year);
        }
        getBookById();
    }, [id]);


    const updateBook = async(e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/books/${id}`, {
                title, 
                author, 
                price, 
                publisher, 
                year
            });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="columns">
            <div className="column is-half">
                <form onSubmit={updateBook}>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input type="text" 
                            className="input" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder='Title'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Author</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}  
                            placeholder='Author'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input type="number" 
                            className="input" 
                            value={price}
                            onChange={(e) => SetPrice(e.target.value)} 
                            placeholder='Price'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Publisher</label>
                        <div className="control">
                            <input type="text" 
                            className="input"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}  
                            placeholder='Publisher'/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Year</label>
                        <div className="control">
                            <input type="number" 
                            className="input"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}  
                            placeholder='Year'/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button type='submit' className='button is-success'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook