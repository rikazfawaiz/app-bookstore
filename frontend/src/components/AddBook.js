import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, SetPrice] = useState(0);
    const [publisher, setPublisher] = useState("");
    const [year, setYear] = useState(0);

    const navigate = useNavigate();

    const saveBooks = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/books', {
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
                <form onSubmit={saveBooks}>
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
                        <button type='submit' className='button is-success'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBook