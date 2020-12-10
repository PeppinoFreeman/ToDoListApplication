const port = 4000; // PORT LOCAL
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  express.static(
    __dirname + "/../../Client/toDoListApplication/dist/toDoListApplication"
  )
);

app.listen(port, () => {
  console.log("Listening to port : " + port);
});

exports.app = app; // On exporte uniquement app
