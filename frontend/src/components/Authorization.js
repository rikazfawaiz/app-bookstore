import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Auth = () => {
    const [setName] = useState("");
    const [setToken] = useState("");
    const [expire, setExpired] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        refreshToken();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const refreshToken = async() => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
        } catch (error) {
            if(error.response) {
                setMessage(error.response.data);
                console.log('error :',error.response.data);
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
      const currentDate = new Date();
      if(expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpired(decoded.exp);
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    return message;
}

const Authorization = ({children}) => {
    const navigate = useNavigate();
    const statuss = Auth();
    if (statuss === 'Unauthorized') {
        return navigate('/login')}
    else{
        return children;
    }
}

export default Authorization;