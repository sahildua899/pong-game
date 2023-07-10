const express = require('express');
const path = require('path');
const {auth} = require('../middleware/auth')


const normalRouter = express.Router();

normalRouter.get('/', (req,res)=>{
    res.render('index')
})
normalRouter.get('/reset', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','..', 'public', 'pages', 'forgot.html'))
})
normalRouter.get('/newPassword/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'newPassWord.html'))
})
normalRouter.get('/authenticate/*', (req,res)=>{
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'verify.html'))
})

normalRouter.get('/pong',auth, (req,res)=>{
    console.log(req.cookies.jwt)
    res.sendFile(path.join(__dirname, '..','..', 'public', 'pages', 'pong.html'))
})




module.exports = normalRouter