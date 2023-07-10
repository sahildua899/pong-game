const Users = require("./users.mongo");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

// Initialising Nodemailer
let mailTransporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'sahildua899@gmail.com',
        pass:'ehigvvdotgmzofzy'
    }
});

// Send Account Verification Mail


// Find User By Email
async function findUserByEmail(emailID) {
    const foundUser = await Users.findOne({email:emailID});
    return foundUser
}
async function findUserById(userId) {
    const foundUser = await Users.findOne({_id:userId});
    return foundUser
}

async function sendVerificationMail(userData, token) {
    if(userData.email) {
        let link = `https://weak-cowboy-boots-tick.cyclic.app/authenticate/${token}`
    let mailDetails = {
        from: 'sahildua899@gmail.com',
        to: userData.email,
        subject: 'Verify Your Email',
        text: `Hi ${userData.firstname} Please Verify your Account by clicking on this link ${link} `
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
    }else {
        const foundUser = await findUserById({_id:userData.id});
        if(foundUser) {
            const newtoken = jwt.sign({phone:foundUser.phone,email:foundUser.email},process.env.TOKEN_CODE, {expiresIn:"2h"});
            let link = `https://weak-cowboy-boots-tick.cyclic.app/authenticate/${newtoken}`
            let mailDetails = {
                from: 'sahildua899@gmail.com',
                to: foundUser.email,
                subject: 'Verify Your Email',
                text: `Hi ${foundUser.firstname} Please Verify your Account by clicking on this link ${link} `
            };
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('Email sent successfully');
                }
            });

        }
    }

}

//Adding New User
async function newUser(userData){
    const foundUser = await findUserByEmail(userData.email)
    if(foundUser) return {statusCode:400,message:'Email Already Registered'}
    const token = jwt.sign({phone:userData.phone,email:userData.email},process.env.TOKEN_CODE, {expiresIn:"2h"});
    const sendingMail = await sendVerificationMail(userData, token)
    userData.token = token
    
    const newUser = await new Users(userData).save();
    return {statusCode:201, message:'Registration Success! We Sent You an Email to Verify Your Account'}
}

async function verifyUser(data) {
    if(!data.token) return {statusCode:400, message:'Verification Code Not Found'}
    const verify = jwt.verify(data.token,process.env.TOKEN_CODE)
    if(!verify) return {statusCode:400, message:'Valid Code Not Found'}
    const updatedUser = await Users.updateOne({email:verify.email}, {isVerified:true});
    if(updatedUser.modifiedCount === 1) {
        return {statusCode:200, message:'Account Successfully Verified'}
    }else {
        return {statusCode:400, message:'Something Went Wrong'}
    }
}

// Login User
async function loginUser(loginData) {
    const foundUser = await findUserByEmail(loginData.email);
    if(!foundUser) return {statusCode:400, message:'Email is Not Registered'}
    if(foundUser.isVerified === false) return {statusCode:400, message:'Please Verify Your Email First'}
    const isMatch = await bcrypt.compare(loginData.password, foundUser.password)
    if(!isMatch) return {statusCode:400, message:'Wrong Credentials'}
    const token = jwt.sign({email:foundUser.email, phone:foundUser.phone}, process.env.TOKEN_CODE, {expiresIn:'2h'})
    return {statusCode:200, message:`Login Success Welcome ${foundUser.firstname} ${foundUser.lastname}`, token}
}

// Forgot Password Sending Mail
async function forgotUser(userData) {
    let foundUser
    if(!userData.email) {
         foundUser = await findUserById(userData.id);
    }else {
         foundUser = await findUserByEmail(userData.email);
    }
    if(!foundUser) return {statusCode:400, message:'No User is Registered with this Email Id'}
    const token = jwt.sign({phone:foundUser.phone,email:foundUser.email},process.env.TOKEN_CODE, {expiresIn:"2h"});
    let link = `http://localhost:1030/newPassword/${token}`
    let mailDetails = {
        from: 'sahildua899@gmail.com',
        to: foundUser.email,
        subject: 'Reset Password',
        text: `Hi ${foundUser.firstname} Please Reset your Password by clicking on this link ${link} `
    };
     
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
    return {statusCode:200, message:`We Just Mailed reset Link on ${foundUser.email}`}
}

// Updating User Password
async function updateUserPass(newUserData) {
    const verifyUser = jwt.verify(newUserData.token,process.env.TOKEN_CODE )
    if(!verifyUser) return {statusCode:400, message:'Something Went Wrong'}
    if(newUserData.password !== newUserData.confirmpassword) return {statusCode:400, message:"Passwords Doesn't Matched ! Please Check Password"}
    let userNewPassword = newUserData.password;
    userNewPassword = await bcrypt.hash(userNewPassword, 10);
    const updatedUser = await Users.updateOne({email:verifyUser.email}, {password:userNewPassword})
    if(updatedUser.modifiedCount == 1) {
        return {statusCode:200, message:'Password Updated Successfully'}
    }else {
        return {statusCode:400, message:'Something Went Wrong'}
    }

}

// Get All User
async function getUsers() {
    const allUsers = await Users.find({});
    return allUsers
}

// Delete User
async function userDelete(userId) {
    const deletedUser = await Users.deleteOne({_id:userId})
    if(deletedUser.deletedCount === 1) {
        return {statusCode:200, message:'User Deleted'}
    }else {
        return {statusCode:400, message:'Something Went Wrong'}
    }
}
    
module.exports = {newUser, loginUser, forgotUser, updateUserPass, verifyUser,getUsers,userDelete,sendVerificationMail}