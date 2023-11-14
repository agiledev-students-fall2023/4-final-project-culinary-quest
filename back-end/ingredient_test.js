const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app'); 
const should = chai.should();

chai.use(chaiHttp);

describe("GET /api/ingredients/:id", () => {
  // Test for successful ingredient retrieval
  it("should return a single ingredient with the given ID", done => {
    const testId = 1; // Replace with a valid ID for your test
    chai.request(server)
      .get(`/api/ingredients/${testId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property('id').eql(testId);
        done();
      });
  });

  // Test for ingredient not found (404)
  it("should return 404 for an ingredient that does not exist", done => {
    const invalidId = 999; // Replace with an ID you know does not exist
    chai.request(server)
      .get(`/api/ingredients/${invalidId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property('status').eql('ingredient not found');
        done();
      });
  });

});
