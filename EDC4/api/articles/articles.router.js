const express = require('express');//module express importer pour creer routeur
const router = express.Router();//creation routeur express
const ArticleController = require('./articles.controller');//import controlleur article
const authMiddleware = require('../../../middlewares/middlewares/auth');// import middleware d'autentification

// Route pour créer new article
router.post('/', authMiddleware, ArticleController.createArticle);

// Route pour maj article 
router.put('/:id', authMiddleware, ArticleController.updateArticle);

// Route pour delete article 
router.delete('/:id', authMiddleware, ArticleController.deleteArticle);

module.exports = router;//exporte routeur pour utilisation dans autre fichiers
