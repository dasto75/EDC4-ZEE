const Article = require('./articles.schema');

class ArticleService {

static async getArticlesByUser(userId) {// Méthode pour récupérer articles utilisateur
  try {
    const articles = await Article.find({ user: userId }).populate('user', '-password');  // Récupére article utilisateur et rempli champ utilisateur sans mdp
    return articles;
  } catch (error) {
    throw new Error(error.message);  //si erreur, lance message error
  }
}    

  static async createArticle(articleData) { // metthode pour creer article 
    try {
      const article = new Article(articleData);
      await article.save();// save article dans bdd
      return article;
    } catch (error) {
      throw new Error(error.message);//lance error si qqch ne fonctionne pas 
    }
  }

  static async updateArticle(articleId, userId, updates) {// methode maj article

    const allowedUpdates = ['title', 'content', 'status'];// Liste champs qui peuvent être mis à jour
    const isValidOperation = Object.keys(updates).every((update) => allowedUpdates.includes(update));// autorisation clés de maj
    if (!isValidOperation) {    // Si  clé de maj pas autorisée, lance erreur
      throw new Error('Mise à jour invalide!');
    }

    try {
      const article = await Article.findOne({ _id: articleId, user: userId });// Trouve article à maj en fonction de son ID et ID de l'utilisateur
      if (!article) {// Si article pas trouvé, lance erreur
        throw new Error('Article non trouvé');
      }

      Object.keys(updates).forEach((update) => (article[update] = updates[update]));      // Applique les maj autorisées à article
      await article.save();// Save les modifications dans la bdd
      return article;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteArticle(articleId, userId) {// metode delete article
    try {
      
      const article = await Article.findOneAndDelete({ _id: articleId, user: userId });// delete article en fonction de son ID et de ID de l'utilisateur
      if (!article) {
        throw new Error('Article non trouvé');
      }
      return article;// Retourne article supprimé
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = ArticleService;// Exporte classe ArticleService pour utilisation dans autres fichiers
