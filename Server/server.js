const app = require("./lib/express.js").app,
  functions = require("./functions");
ROUTES = require("./lib/routes").Routes;

app.get(ROUTES.Home, functions.loadHomePage);

/// LISTE DES TACHES ///
app.get(ROUTES.collection, functions.getCollection);

app.post(ROUTES.collection, functions.addItemToCollection);

app.put(ROUTES.collection, functions.updateItemInCollection);

app.put(ROUTES.collection2, functions.updateWholeCollection);

/// LISTE DES CATEGORIES ///
app.get(ROUTES.category, functions.getCategories);

app.post(ROUTES.category, functions.addItemToCategories);

app.put(ROUTES.category, functions.updateItemInCategories);

app.post(ROUTES.category_delete, functions.deleteItemInCategories);

/// REDIRECTION ///
app.get("*", functions.redirectHome);
