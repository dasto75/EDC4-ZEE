
const ArticleService = require('./articles.service'); 
const { validationResult } = require('express-validator'); 

class ArticleController {

  static async createArticle(req, res) {
    const errors = validationResult(req);//validation erreur dans requete
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });//si erreur de validation renvoi reponse 400 avec erreur
    }

    try {
      const articleData = {...req.body,user: req.user.id, //prepare données de article avec id utilisateur et les dates de création et de mise à jour
        createdAt: new Date(), // Date création de article
        updatedAt: new Date(), // Date mise à jour de article
      };
      const article = await ArticleService.createArticle(articleData);// demande au service pour créer article avec données
      res.status(201).json(article);// envoi réponse avec article creer et code de statut 201
    } catch (error) {
      res.status(500).json({ error: error.message });// envoi réponse avec message erreur et ode de statut 500 
    }
  }

  static async updateArticle(req, res) {
    const { id } = req.params; // recupere id de article depuis les parametres de la requete
    const userId = req.user.id; // recupere id utilisateur connecter
    const errors = validationResult(req); // Validation erreurs dans requête
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé' }); // Si utilisateur est pas admin, renvoie une réponse 403 erreur
    }
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });// si erreur de validation trouver renvoi réponse 400 avec erreur
    }

    try {
      const updates = {...req.body,updatedAt: new Date(), // // Prépare données de maj de article et maj date de mise à jour de article
      };
      const article = await ArticleService.updateArticle(id, userId, updates);//demande servic de de maj article avec new données
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteArticle(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé' }); // Si l'utilisateur est pas admin, envoi une réponse 403 erreur
    }
    try {
      const article = await ArticleService.deleteArticle(id, userId);//appel service pour delete article
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ArticleController;
