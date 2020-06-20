require('dotenv').config();
const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token =req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.')

    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if (err) return res.status(400).send('Invalid token.');
        req.user=decoded;
        next();
    });
}