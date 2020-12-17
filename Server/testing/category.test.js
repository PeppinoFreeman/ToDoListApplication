process.env.NODE_ENV = "test";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  request = require("supertest"),
  server = require("../server").app,
  routes = require("../lib/routes").Routes,
  expect = chai.expect;

chai.use(chaiHttp);

describe("Table des catégories", () => {
  const selected = "House",
    updated = "Maison";

  it("Ajoute une catégorie", (done) => {
    request(server)
      .post(routes.category)
      .send({ newCategory: selected })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body.category).to.be.a("string");
        expect(res.body).to.contain.property("category", selected);
        expect(res.body).to.contain.property("_id");
        done();
      });
  });

  it("Récupère la liste des catégories", (done) => {
    request(server)
      .get(routes.category)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        expect(res.body[0]).to.be.a("object");
        expect(res.body[0].category).to.be.a("string");
        expect(res.body.length).to.be.gte(1);
        expect(res.body[0]).to.contain.property("category", selected);
        expect(res.body[0]).to.contain.property("_id");
        done();
      });
  });

  it("Modifie une catégorie", (done) => {
    request(server)
      .put(routes.category)
      .send({ selectedCategory: selected, newCategory: updated })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });

    request(server)
      .get(routes.category)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].category).to.eql(updated);
      });
  });

  it("Supprime une catégorie", (done) => {
    request(server)
      .post(routes.category_delete)
      .send({ selectedCategory: updated })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    request(server)
      .get(routes.category)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.empty;
      });
  });
});
