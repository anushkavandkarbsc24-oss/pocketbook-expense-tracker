const express = require('express');
const { getAll, add, remove } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // every route below needs a valid JWT

router.get('/', getAll);
router.post('/', add);
router.delete('/:id', remove);

module.exports = router;
