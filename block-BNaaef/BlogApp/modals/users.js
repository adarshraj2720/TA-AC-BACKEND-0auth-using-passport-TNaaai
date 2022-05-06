var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
    name :String,
    email : {type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    photo :{type:String}
})

module.exports= mongoose.model('Users',userSchema)