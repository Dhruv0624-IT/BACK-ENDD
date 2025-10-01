const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController');

router.get('/', controller.listBooks);
router.get('/:id', controller.getBook);
router.post('/', controller.createBook);
router.put('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);

module.exports = router;
