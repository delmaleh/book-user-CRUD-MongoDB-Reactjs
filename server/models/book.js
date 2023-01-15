const mongoose = require('mongoose');

const Book = mongoose.model('Book',{
author:{
    type: String,
    required:true   
},
title:{
    type: String,
    required:true   
},
year_publication:{
    type: Number,
    required:true   
},
price:{
    type: Number,
    required:true   
},
type:{
    type: String,
    required:true   
},
description:{
    type: String,
    required:true   
}
});

module.exports = {Book};