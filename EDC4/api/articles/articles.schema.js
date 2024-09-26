const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true, // titre requis
    minlength: 5, // titre doit faire au moins 5 caractères
    maxlength: 100, // titre doit pas dépasser 100 caractères
  },
  content: {
    type: String,
    required: true, // contenu requis
    minlength: 20, // contenu doit faire au moins 20 caractères
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // L'utilisateur requis
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  status: {
    type: String,
    enum: ["draft", "published"], // statut doit être soit "draft" soit "published"
    required: true, // statut requis
    default: "draft", // valeur par défaut de statut
  },
});
const Article = mongoose.model('Article', ArticleSchema);
module.exports = model("Article", articleSchema);

/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/
