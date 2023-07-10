const express = require('express');
const { httpAddNewUser, httpLoginUser,httpForgotUser, httpResetPassword, httpVerifyUser, httpGetAllUsers, httpDeleteUser,httpSendVerificationMail } = require('./users.controller');
const userRouter = express.Router();

userRouter.post('/addNew', httpAddNewUser);
userRouter.post('/login', httpLoginUser);
userRouter.post('/forgot', httpForgotUser);
userRouter.post('/newpass', httpResetPassword);
userRouter.post('/authenticate', httpVerifyUser);
userRouter.post('/', httpGetAllUsers);
userRouter.delete('/delete/:id', httpDeleteUser);
userRouter.post('/verifyAccount', httpSendVerificationMail)


module.exports = userRouter