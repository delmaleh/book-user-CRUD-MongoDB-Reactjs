const mongoose = require('mongoose');

const User = mongoose.model('User',{
name:{
    type: String,
    required:true   
},
lastname:{
    type: String,
    required:true   
},
email:{
    type: String,
    required:true,
    unique: true   
},
books:{
    type: [mongoose.Types.ObjectId],
    ref:'Book'   
},
age:{
    type: Number,
    min:18,
    max:120   
}

});

module.exports = {User};