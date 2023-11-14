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

// Run the tests with the following command:
// npx mocha --exit
