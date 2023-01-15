const router = require('express').Router();
const bookController = require('../controllers/book');

router.get('/',bookController.get_books);
router.get('/:id',bookController.get_book);
router.post('/',bookController.create_book);
router.post('/filter',bookController.filter_book);
router.delete('/:id',bookController.delete_book);
router.put('/:id',bookController.update_book);


module.exports = router;