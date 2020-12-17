process.env.NODE_ENV = "";

const chai = require("chai"),
  chaiHttp = require("chai-http"),
  request = require("supertest"),
  server = require("../server").app,
  routes = require("../lib/routes").Routes,
  expect = chai.expect;

chai.use(chaiHttp);

describe("Autre tests", () => {
  it("Redirige vers la page d'accueil si page inexistante", (done) => {
    request(server)
      .get("/mocha")
      .end((err, res) => {
        expect(res).to.have.status(302);
        expect(res).to.redirectTo(routes.Home);
        done();
      });
  });

  it("Charge la page d'accueil", (done) => {
    request(server)
      .get(routes.Home)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
