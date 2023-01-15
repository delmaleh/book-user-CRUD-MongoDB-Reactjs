const mongoose = require('mongoose');

const UserLogin = mongoose.model('UserLogin',{
userName:{
    type: String,
    required:true   
},
password:{
    type: String,
    required:true   
}
});

module.exports = {UserLogin};
