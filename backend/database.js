const mongoose = require('mongoose');
const connectbd= async()=>{
   await  mongoose.connect("mongodb+srv://sujalsoni7895:vermasujal8810@divine.sc0yg.mongodb.net/test")
}

module.exports=connectbd;