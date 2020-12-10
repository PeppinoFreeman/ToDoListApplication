promise = require("bluebird");
var mongoose = promise.promisifyAll(require("mongoose"));

// CONNEXION à MONGODB
mongoose.connect("mongodb://localhost/ToDoDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

exports.mongoose = mongoose; // On exporte uniquement mongoose
