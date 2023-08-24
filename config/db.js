const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require('dotenv');

const connectDB = async()=>{
  try{
    await mongoose.connect(`${process.env.DATABASE}`);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white
    );
  }
  catch(err){
    console.log(`Mil gya error ${err}`.bgRed.white)
  }
};

module.exports = connectDB;