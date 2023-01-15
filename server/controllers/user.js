//All function of Book for Crud 

const {User} = require('../models/user');
const {UserLogin} = require('../models/userLogin');

const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds=10;


exports.check_userId = async(userId) => {
  try {
    let user = await UserLogin.findOne({ _id: userId })
    console.log(user);
    if(user) return true
    return false
  } catch (error) {
    return false
  }
};


exports.login = async (req, res) =>{

  const {password,userName}= req.body;
  console.log('body',req.body);
  const user= await UserLogin.findOne({userName});
  if (!user) {
    res.status(401).json({error:'user does no exist'});
  }
  else {
    bcrypt.compare(password,user.password)
    .then(valid => {
        if (!valid) res.status(401).json({error:'wrong password'});
        else {
            res.status(200).json({
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn:'24h'}
                ),
                message:'connexion successful'
            })
        }
    })
    .catch(error=>  res.status(500).json({error:'error'}));

   
}

};

exports.signup = async (req, res) =>{

    const {password,userName}= req.body;
    const user= await UserLogin.findOne({userName});
    if (user) {
        res.status(401).json({error:'user already exist'});
    }
    else {
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            bcrypt.hash(password, salt, function(err, hash) {
                // returns hash
                console.log(hash);
                let user = new User({userName,password:hash});
                user.save().then((results)=>{
                    res.status(200).send('create successfuly');
                },(error)=>{
                    res.status(400).send(error);
                })
            });    // returns salt
        });
    }
    
}    
exports.create_user = (req, res) =>{
  
  let user = new User({...req.body});
  user.save().then((doc)=>{
    res.status(200).send("create successfully");
  },(error)=> {
      res.status(400).send(error);
  });
}

exports.get_users = (req, res) =>{

  User.find({}).populate('books')
    .then(users =>{
      res.status(200).send(users)})
    .catch(error => {res.status(404).json({ error });console.log(error)});
}

exports.get_user = (req, res) =>{

  const id = req.params.id;
  User.findOne({ _id: id}).populate('books')
    .then(user =>{
      res.status(200).send(user)})
    .catch(error => {res.status(404).json({ error });console.log(error)});
}

exports.update_user = (req, res) =>{

  const id = req.params.id;
  const body = req.body;
    User.updateOne({ _id: id}, {...body})
      .then(() =>{
        res.status(200).send("update successfully")})
      .catch(error => res.status(400).json({ error }));
}

exports.delete_user = (req, res) =>{
  
  const id = req.params.id;
  User.deleteOne({ _id: id})
    .then(()=>{
      res.status(200).send("delete successfully")})
    .catch(error => res.status(400).json({ error }));
}

exports.check_token = (req, res) => {
  return res.status(200).json({userId: req.user_id});
}
