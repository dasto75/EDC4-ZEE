const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/not-found');
const userRouter = require('./api/users/users.router');
const usersController = require('./api/users/users.controller');
const authMiddleware = require('./middlewares/auth');
const articleRouter = require('./api/articles/articles.router');
require('./api/articles/articles.schema'); // temporaire
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/EDC', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  /*socket.on("my_event", (data) => {
    console.log(data);
  });
  io.emit("event_from_server", { test: "foo" });*/
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());// Middleware CORS et JSON
app.use(express.json());

// Routes API
app.use('/api/users', authMiddleware, userRouter);
app.use('/api/articles', articleRouter);

// Route de connexion
app.post('/login', usersController.login);

// Servir les fichiers statiques
app.use('/', express.static('public'));

// Middleware pour les erreurs 404
app.use((req, res, next) => {
  next(new NotFoundError());
});

// Middleware de gestion des erreurs
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status);
  res.json({
    status,
    message,
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {
  app,
  server,
};
