const jwt = require('jsonwebtoken');
const {check_userId} = require('../controllers/user')

//function that you must add in router which need auth
module.exports = async (req, res, next) => {
  try {
    console.log( req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const checkUser = await check_userId(userId);
    if (!checkUser) {
      throw 'Invalid user ID';
    } else {
      req.user_id = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};