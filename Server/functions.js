const mongoose = require("./lib/mongoDB").mongoose,
  Task = require("./lib/Schema").Task,
  Category = require("./lib/Schema").Categories;

// Test d'erreur sur une requête
testError = (err, Obj) => {
  if (err) console.log(err);
  return Obj;
};

// Charge la page d'accueil
exports.loadHomePage = (req, res) => {
  res.sendFile(
    __dirname +
      "/../../Client/toDoListApplication/dist/toDoListApplication/index.html"
  );
};

// Redirige vers la page d'accueil
exports.redirectHome = (req, res) => {
  res.redirect(ROUTES.Home);
};

/// LISTE DES TACHES ///
// Recupère la liste des tâches de la BD
exports.getCollection = (req, res) => {
  Task.find()
    .catch(testError)
    .then((Task) => {
      res.send(Task);
    });
};
// Ajoute une nouvelle tâche à la BD
exports.addItemToCollection = (req, res) => {
  const newTask = new Task(req.body);
  newTask._id = new mongoose.mongo.ObjectId();
  newTask
    .save()
    .catch(testError)
    .then((Task) => {
      res.json(Task);
    });
};
// Met à jour une tâche sur la BD
exports.updateItemInCollection = (req, res) => {
  const options = { _id: req.body._id };
  delete req.body["_id;"];
  Task.findOneAndUpdate(options, req.body)
    .catch(testError)
    .then((Task) => {
      res.json(Task);
    });
};
// Met à jour les catégories de toutes les tâches sur la BD
exports.updateWholeCollection = (req, res) => {
  for (const i in req.body) {
    Task.findOneAndUpdate(
      { _id: req.body[i]._id },
      { category: req.body[i].category }
    ).catch(testError);
  }
};

/// LISTE DES CATEGORIES ///
// Récupère la liste des catégorie de la BD
exports.getCategories = (req, res) => {
  Category.find()
    .catch(testError)
    .then((Category) => {
      res.send(Category);
    });
};
// Ajoute une nouvelle catégorie à la BD
exports.addItemToCategories = (req, res) => {
  const newCategory = new Category({ category: req.body.newCategory });
  newCategory._id = new mongoose.mongo.ObjectId();
  newCategory
    .save()
    .catch(testError)
    .then((Category) => {
      res.json(Category);
    });
};
// Met à jour une catégorie sur la BD
exports.updateItemInCategories = (req, res) => {
  Category.findOneAndUpdate(
    { category: req.body.selectedCategory },
    { category: req.body.newCategory }
  )
    .catch(testError)
    .then((Category) => {
      res.send(Category);
    });
};
// Supprime une catégorie de la BD
exports.deleteItemInCategories = (req, res) => {
  Category.deleteOne({ category: req.body.selectedCategory })
    .catch(testError)
    .then(() => {
      res.json("Suppression effectuée.");
    });
};
