import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUser = async(req, res) => {
    try {
        const users = await Users.find({}, {password:0, refresh_token:0});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const registerUser = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    console.log('users :', req.body);

    if(password !== confPassword) return res.status(400).json({message: 'Password dan Confirm Password tidak cocok'});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const users = new Users({name, email, password:hashPassword});
        await users.save();
        res.status(200).json({message: 'Register Berhasil'})
    } catch (error) {
        console.log('register :', error.message);
        res.status(400).json({message: error.message})
    }
}

export const loginUser = async(req, res) => {
   try {
        const user = await Users.find({email : req.body.email});
        const match = await bcrypt.compare(req.body.password, user[0].password);
        
        if(!match) return res.status(400).json({message: "Password tidak cocok"});
        
        const {id, name, email} = user[0];
        const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({id, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await Users.updateOne({_id:id}, {refresh_token: refreshToken});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            // ,secure: true -> https
        });

        res.json({ accessToken });

   } catch (error) {
        res.status(404).json({message: "Email tidak ditemukan"});
   } 
}

export const logoutUser = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const user = await Users.find({refresh_token:refreshToken});
    if(!user[0]) return res.sendStatus(204);

    const {_id} = user[0];
    await Users.updateOne({_id:_id}, {refresh_token:null});

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}