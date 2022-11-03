import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const newRegister = async(e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users',{
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate('/login');
        } catch (error) {
            if(error.response) {
                setMessage(error.response.data.message);
            }
        } 
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={newRegister} className="box">
                                <p className='has-text-centered'>{message}</p>
                                <div className="field mt-5">
                                    <label className='label'>Name</label>
                                    <div className="controls">
                                        <input type="text" className='input' placeholder='Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className='label'>Email</label>
                                    <div className="controls">
                                        <input type="text" className='input' placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className='label'>Password</label>
                                    <div className="controls">
                                        <input type="password" className='input' placeholder='********'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className='label'>Confirm Password</label>
                                    <div className="controls">
                                        <input type="password" className='input' placeholder='********'
                                        value={confPassword}
                                        onChange={(e) => setConfPassword(e.target.value)}
                                        required/>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <div className="control" required>
                                        <button type='submit' className='button is-success is-fullwidth'>Register</button>
                                    </div>
                                </div>
                                <p className='has-text-centered'>Sudah punya akun? <Link to={'/login'}>Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register