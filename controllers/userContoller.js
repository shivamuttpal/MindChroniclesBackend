
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
exports.getAllUsers=async (req,res)=>{
  try{
    const users = await userModel.find({});
    return res.status(200).send({
      userCount:users.length,
      sucess:true,
      message:"all users data",
      users,
    })
  }catch(err){
    console.log(err);
    return res.status(500).send({
      message:"Error in get all User",
      sucess:false,
      error
    })
  }
};

exports.registerController = async (req,res)=>{
  try{
    const {username,email,password} = req.body
    //validation
    if(!username || !email||!password){
      return res.status(400).send({
        sucess:false,
        message:'Please Fill all Fields'
      })
    }
    //existing user
    const existinguser =await userModel.findOne({email})
    if(existinguser){
      return res.status(401).send({
        sucess:false,
        message:'user already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    //save new user
    const user = new userModel({username,email,password:hashedPassword})
    await user.save();
    
    return res.status(201).send({
      sucess:true,
      message:'New User Created',
      user 
    }) 
  }catch(err){
    console.log(err);
    return res.status(500).send({
      message:"Error is Register callback",
      sucess:false,
      err
    })
  }
};

exports.loginController=async(req,res)=>{
  try{
    const {email,password}= req.body
    if(!email || !password){
      return res.status(401).send({
        sucess:false,
        message:"Please provide email or password"
      })
    }
    const user = await userModel.findOne({email})
     if(!user){
      return res.status(200).send({
        sucess:false,
        message:'email is not registered'
      })
     }
     // password
    //  const isMatch = await bcrypt.compare(password,user.password)|| compare(password,user.password)
    const isMatch = await bcrypt.compare(password, user.password) ;

     if(!isMatch){
      return res.status(401).send({
        sucess:false,
        message:'Invalid username or password'
      })
     }
     return res.status(200).send({
      sucess:true,
      message:'login sucessfully',
      user
     })
  }
  catch(err){ 
    // console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      err,
    });
  }
};