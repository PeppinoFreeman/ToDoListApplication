process.env.NODE_ENV = "test";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  request = require("supertest"),
  server = require("../server").app,
  routes = require("../lib/routes").Routes,
  expect = chai.expect;

chai.use(chaiHttp);

describe("Table des tâches", () => {
  const task = {
    title: "Faire les courses.",
    type: "Ponctuel",
    category: "Personnel",
    startDate: "2020-12-03",
    finishDate: "2020-12-03",
    duration: 1,
    taskFinished: false,
    taskPercentage: 0,
  };
  let id = 0;
  runTests = (res, body) => {
    expect(res).to.have.status(200);
    expect(body).to.be.a("object");
    expect(body.title).to.be.a("string");
    expect(body.type).to.be.a("string");
    expect(body.category).to.be.a("string");
    expect(body.startDate).to.be.a("string");
    expect(body.finishDate).to.be.a("string");
    expect(body.duration).to.be.a("number");
    expect(body.taskFinished).to.be.a("boolean");
    expect(body.taskPercentage).to.be.a("number");

    expect(body).to.contain.property("title", task.title);
    expect(body).to.contain.property("type", task.type);
    expect(body).to.contain.property("category", task.category);
    expect(body).to.contain.property("startDate", task.startDate);
    expect(body).to.contain.property("finishDate", task.finishDate);
    expect(body).to.contain.property("duration", task.duration);
    expect(body).to.contain.property("taskFinished", task.taskFinished);
    expect(body).to.contain.property("taskPercentage", task.taskPercentage);

    expect(body).to.contain.property("_id");
  };

  it("Ajoute une tâche", (done) => {
    request(server)
      .post(routes.collection)
      .send(task)
      .end((err, res) => {
        runTests(res, res.body);
        id = res.body._id;
        done();
      });
  });

  it("Récupère la liste des tâches", (done) => {
    request(server)
      .get(routes.collection)
      .end((err, res) => {
        runTests(res, res.body[0]);
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.gte(1);
        done();
      });
  });

  it("Modifie une tâche", (done) => {
    task.title = "Nouveau titre";
    task.category = "Travail";
    task.taskFinished = true;
    task.taskPercentage = 100;

    request(server)
      .put(routes.collection)
      .send({
        title: task.title,
        category: task.category,
        taskFinished: task.taskFinished,
        taskPercentage: task.taskPercentage,
        _id: id,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    request(server)
      .get(routes.collection)
      .end((err, res) => {
        runTests(res, res.body[0]);
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.be.gte(1);
        done();
      });
  });

  it("Modifie la catégorie de toutes les tâches", (done) => {
    task.category = "Autre";

    request(server)
      .put(routes.collection2)
      .send([{ _id: id, category: task.category }])
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    request(server)
      .get(routes.collection)
      .end((err, res) => {
        runTests(res, res.body[0]);
        done();
      });
  });
});
