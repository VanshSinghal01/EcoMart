const mongoose = require('mongoose');
const { type } = require('os');
const productschema = mongoose.Schema({
     
    
        mainid: {
            type: String
        },
        id: {
            type: Number
        },
        product: {
            type: String
        },
        product_name:{
            type: String
        },
        rateing: {
            type: String
        },
        quantity:{
            type: String
        },
        current_price:{
            type: Number
        },
        mrp: {
            type: Number
        },
        discount: {
            type: Number
        },
      
})

module.exports = mongoose.model('productdatas', productschema);