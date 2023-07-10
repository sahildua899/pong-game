const jwt = require('jsonwebtoken');
const path = require('path')

const auth = async(req,res,next)=>{
    try {

        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.TOKEN_CODE)
        next()
        
    } catch (error) {
        res.redirect('/')
    }
}


module.exports = {auth}