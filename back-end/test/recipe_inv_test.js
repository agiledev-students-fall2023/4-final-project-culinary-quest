const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // replace with the actual path to your Express app file

chai.use(chaiHttp);
const expect = chai.expect;
const assert = require("assert")
const SERVER_NAME = "localhost://3001"

describe ("GET request to /api/recipes", () => {
    it ("it should respond with an HTTP 200 status code and a JSON object in the response body", done => {
        chai
            .request(${SERVER_NAME})
            .get("api/recipes")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property("name", true)
                done()
            })
    })
})