//To put all route here if you want to add in future

const router = require('express').Router();
var bookRoute = require('./book');
var userRoute = require('./user');


router.use('/book',bookRoute);
router.use('/user',userRoute);

module.exports = router;