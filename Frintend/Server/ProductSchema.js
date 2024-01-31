const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    USER_Id:String,
    Company:String,
    Category:String,
    Name : String,
    Price:Number,

});

module.exports = mongoose.model('Products',ProductSchema);