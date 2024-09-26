const jwt = require('jsonwebtoken');// Importation jsonwebtoken pour gestion tokens JWT
const User = require('../api/users/users.model');

const auth = async (req, res, next) => {// Middleware authentification asynchrone pour vérifier tokens JWT
  const token = req.header('Authorization').replace('Bearer ', '');// recupere token JWT depuis en tete autorisation
  if (!token) {//si pas de token fourni renvoi erreur 401 
    return res.status(401).json({ error: 'Accès refusé, aucun token fourni' });
  }

  try {//verifie token en utilisant clé secret
    const decoded = jwt.verify(token,process.env.JWT_SECRET); //clé secret : rzez5er4zer1ze5rez58r1zer14
    const user = await User.findById(decoded.id);//cherche utilisateur qui correspond a id decoder du token
    if (!user) {// envoi erreur si ne trouve pas
      throw new Error();
    }
    req.user = user;//met utilisateur a la requete pour utilisation ulterieur
    next();
  } catch (error) {//si erreur renvoi message erreur 400
    res.status(400).json({ error: 'Token invalide' });
  }
};

module.exports = auth;
