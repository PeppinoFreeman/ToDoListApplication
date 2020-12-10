const mongoose = require("./mongoDB.js").mongoose;

/// SCHEMA/ MODELE
/// Task
const TaskSchema = mongoose.Schema(
  {
    title: String,
    type: String,
    category: String,
    startDate: String,
    finishDate: String,
    completionDate: String,
    isLate: Boolean,
    duration: Number,
    taskFinished: Boolean,
    taskPercentage: Number,
  },
  { versionKey: false }
);
/// Category
const CategorySchema = mongoose.Schema(
  { category: String },
  { versionKey: false }
);

let Task = mongoose.model("TaskList", TaskSchema);
let Categories = mongoose.model("CategoryList", CategorySchema);

exports.Task = Task;
exports.Categories = Categories;
