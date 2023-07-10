const express = require('express');
const userRouter = require('./users/users.router');

const api  = express.Router();

api.use('/users', userRouter)

module.exports = api;