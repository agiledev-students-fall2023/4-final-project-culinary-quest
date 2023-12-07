const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // replace with the actual path to your Express app file

chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');

// RECIPE TESTS
describe('.GET request to /api/recipes/...', () => {
  it('should return all recipes', done => {
    const search = ""
    const toggle = false

    chai
      .request(app)
      .get(`/api/recipes/search?y=${search}&z=${toggle}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('recipes').to.be.an('array');
        expect(res.body.recipes[0]).to.be.an("object")
        expect(res.body.recipes[0].name).to.be.a("string")
        expect(res.body).to.have.property('status').eql('All good - recipes recieved');
        done()
      })
  })
  it('should return all recipes while filtering by ingredients', done => {
    const search = ""
    const toggle = false

    chai
      .request(app)
      .get(`/api/recipes/search?y=${search}&z=${toggle}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('recipes').to.be.an('array');
        expect(res.body.recipes[0]).to.be.an("object")
        expect(res.body.recipes[0].name).to.be.a("string")
        expect(res.body).to.have.property('status').eql('All good - recipes recieved');
        done()
      })
  })
  it('should return one selected recipe', done => {
    const id = new mongoose.Types.ObjectId('65641014a6096d792241250c')
    chai
      .request(app)
      .get(`/api/recipes/single/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('recipe').to.be.an('object');
        expect(res.body).to.have.property('status').eql('all good - single');
        done()
      })
  })
  it('should update a recipe with new info', done => {
    const id = new mongoose.Types.ObjectId('65641014a6096d792241250c')
    const nName = "AAAAAAAAAAAAAAAAAAAAAA"
    chai
      .request(app)
      .put(`/api/recipes/edit/${id}?name=${nName}`)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('status').eql('recipe updated successfully')
        done()
      })
  })
})

// describe('/GET api/recipes/single/:recipeId', () => {
//   it('it should return a single selected recipe', async () => {
//     const res = await chai
//       .request(app)
//       .post('/api/recipes/single/:recipeId')
//       .send({y: 0})
//     console.log(res.body)
//     expect(res).to.have.status(200);
//     expect(res.body).to.have.property('recipe').to.be.an('array');
//     expect(res.body).to.have.property('status').eql('all good - single');
//   })
// })