const userModel = require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();

const getsignup = async (req, res) => {
    // Implement logic to signup
    const {fullname,email,password,profileImg}=req.body;
     if(!fullname||!email||!password){
        return res.status(400).json({error:"one or more mandatory fields are empty"});
     }
     try{
     const user=await userModel.findOne({email:email});
     if(user){
        return res.status(500).json({error:"user already exist"});
     }
       const hashpass=await bcrypt.hash(password,12);
       const newUser=new userModel({fullname,email,password:hashpass,profileImg});
       const resp = await newUser.save();
       return res.status(201).send({ message: "User created", resp });
     }
     catch(error){
        console.log(error);
        return res.send({message:"error occured"},error);
     }
}

const getlogin = async (req, res) => {
    // Implement logic to signup
    const {email,password}=req.body;
     if(!email||!password){
        return res.status(400).json({error:"one or more mandatory fields are empty"});
     }
     try{
     const user=await userModel.findOne({email:email});
     if(!user){
        return res.status(401).json({error:"INVALID CREDENTIALS"});
     }
       const checkpassword=await bcrypt.compare(password,user.password);
       if(checkpassword){
        const jwttoken=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        const userInfo={"email":user.email,"fullname":user.fullname,"_id":user._id};

        return res.status(200).json({result:{token:jwttoken,user:userInfo}});
       }
       else{
        return res.status(401).json({error:"INVALID CREDENTIALS"});
       }
     }
     catch(error){
        console.log(error);
        return res.send({message:"error occured during login"},error);
     }
}


module.exports = {
    getsignup,
    getlogin
}