promise = require("bluebird");
const mongoose = promise.promisifyAll(require("mongoose"));
const DB_Url = "mongodb://localhost/ToDoDatabase";

// CONNEXION à MONGODB
connection = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

// CONNEXION A UNE FAUSSE DATABASE DANS UN CAS DE TEST
if (process.env.NODE_ENV === "test") {
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const mongoServer = new MongoMemoryServer();

  mongoose.Promise = Promise;
  mongoServer.getUri().then((mongoUri) => {
    connection(mongoUri);
  });
}
// CONNEXION A LA VRAIE DB DANS UN CAS NORMAL
else {
  connection(DB_Url);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB!");
  });
}

exports.mongoose = mongoose; // On exporte uniquement mongoose
