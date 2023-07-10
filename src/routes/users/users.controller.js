const { newUser, loginUser, forgotUser, updateUserPass, verifyUser, getUsers, userDelete, sendVerificationMail } = require("../../model/users.model")

// Adding New User
async function httpAddNewUser(req,res){
    const addedUser = await newUser(req.body)
    res.status(addedUser.statusCode).send(addedUser)
}

//Verifying User

async function httpVerifyUser(req,res) {
    const verifiedUser = await verifyUser(req.body);
    res.status(verifiedUser.statusCode).send(verifiedUser)
}

// Login User
async function httpLoginUser(req,res){
    const LoggedInUser = await loginUser(req.body)
    res.cookie("jwt", LoggedInUser.token)
     delete LoggedInUser.token
    
    res.status(LoggedInUser.statusCode).send(LoggedInUser)
}

//Forget User
async function httpForgotUser(req,res){
    const forgotenUser = await forgotUser(req.body);
    res.status(forgotenUser.statusCode).send(forgotenUser)
    
}

// Update Password
async function httpResetPassword(req,res) {
    const updatedResponse = await updateUserPass(req.body);
    res.status(updatedResponse.statusCode).send(updatedResponse)
}

// Getting All Users
async function httpGetAllUsers(req,res) {
    const allUsers = await getUsers();
    res.send(allUsers)
}

// Deleting User
async function httpDeleteUser(req,res) {
    const deletedUser = await userDelete(req.params.id)
    res.send(deletedUser)
}

// send verfication mail
async function httpSendVerificationMail(req,res){
    const mailSent = await sendVerificationMail(req.body)
}
module.exports= {httpAddNewUser, httpLoginUser, httpForgotUser, httpResetPassword,httpVerifyUser, httpGetAllUsers, httpDeleteUser,httpSendVerificationMail}