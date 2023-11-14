const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // replace with the actual path to your Express app file

chai.use(chaiHttp);
const expect = chai.expect;

// Test the home route
describe('/GET home', () => {
  it('it should return a success message', async () => {
    const res = await chai.request(app).get('/home');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').eql('Home route');
    expect(res.body).to.have.property('status').eql('success');
  });
});

// Test the login route
describe('/POST api/login', () => {
  it('it should return a success message for valid credentials', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: 'valid@example.com', password: 'validpassword' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').eql('Login successful');
    expect(res.body).to.have.property('status').eql('success');
  });

  it('it should return an error for invalid credentials', async () => {
    const res = await chai
      .request(app)
      .post('/api/login')
      .send({ email: 'invalid@example.com', password: 'invalidpassword' });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('error').eql('Invalid credentials');
    expect(res.body).to.have.property('status').eql('failed');
  });
});

// test changeUsername route
describe('POST /api/change-username', () => {
  it('should change the username if a new username is provided', (done) => {
    const newUsername = 'newUser123';
    chai.request(app)
      .post('/api/change-username')
      .send({ newUsername })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Username successfully changed');
        expect(res.body).to.have.property('status', 'success');
        done();
      });
  });

  it('should return an error if no new username is provided', (done) => {
    chai.request(app)
      .post('/api/change-username')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error', 'Failed to reset username');
        expect(res.body).to.have.property('status', 'failed');
        done();
      });
  });
});

// Add similar tests for other routes...

// Example unit test for the ingredients search route
describe('/GET api/ingredients/:name', () => {
  it('it should return filtered ingredients based on the search query', async () => {
    const res = await chai.request(app).get('/api/ingredients/apple');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('ingredients').to.be.an('array');
    expect(res.body).to.have.property('status').eql('all good');
  });
});

describe('/GET api/ingredients', () => {
  it('it should return all ingredients', async () => {
    const res = await chai.request(app).get('/api/ingredients');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('ingredients').to.be.an('array');
    expect(res.body.ingredients).to.not.be.empty;
    expect(res.body).to.have.property('status').eql('all good');
  });

  it('it should filter ingredients based on the search query', async () => {
    const searchQuery = 'exampleIngredient'; // Replace with a valid ingredient name for testing
    const res = await chai.request(app).get(`/api/ingredients?searchQuery=${searchQuery}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('ingredients').to.be.an('array');
    expect(res.body.ingredients).to.satisfy((ingredients) =>
      ingredients.every((ingredient) => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    expect(res.body).to.have.property('status').eql('all good');
  });

  it('it should return an empty array if no ingredients match the search query', async () => {
    const searchQuery = 'nonExistentIngredient';
    const res = await chai.request(app).get(`/api/ingredients?searchQuery=${searchQuery}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('ingredients').to.be.an('array').that.is.empty;
    expect(res.body).to.have.property('status').eql('all good');
  });

});

// Run the tests with the following command:
// npx mocha --exit
