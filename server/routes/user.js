const router = require('express').Router();
const userController = require('../controllers/user');
const auth=require('../middleware/auth');

router.get('/',userController.get_users);
router.get('/:id',userController.get_user);
router.post('/',userController.create_user);
router.delete('/:id',userController.delete_user);
router.put('/:id',userController.update_user);
router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.get('/self',auth,userController.check_token);


module.exports = router;