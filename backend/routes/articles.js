const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createArticle, deleteArticle, getArticles, getArticleById } = require('../controllers/articles');

router.get('/', getArticles);
router.get('/:id', getArticleById);

router.use(verifyToken);

router.post('/', createArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
