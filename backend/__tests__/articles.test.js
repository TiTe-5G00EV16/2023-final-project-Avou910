const { describe, test, expect, afterAll } = require('@jest/globals');
const supertest = require('supertest');

const connection = require('../db/pool');
const app = require('../app');

describe('GET articles endpoint', ()=> {

  test('should return 200', (done)=> {
    supertest(app)
      .get('/api/articles')
      .expect(200)
      .end(done)
  });

  test('should return json data', async () => {
    const response = await supertest(app)
    .get('/api/articles')
    .set('Accept', 'application/json');
  
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'Chair',
          price: '10.99',
          email: 'john@wick.com',
        }),
       
      ])
    );
  });

});

describe('GET article by id enpoint', () => {

  test('should return 200 if item was found', (done) => {
    supertest(app)
      .get('/api/articles/1')
      .expect(200)
      .end(done);
  });

  test('should return 200 and json if the item was found', async() => {
    const response = await supertest(app)
      .get('/api/articles/1')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Chair',
        email: 'john@wick.com'
      })
    );
  });

});

describe ('POST article endpoint', ()=> {

  const loggedInUser = {
    id: '',
    email: '',
    token: ''
  }

  beforeAll(async () => {
    connection.query('DELETE FROM users WHERE email=?', ['testi.testi@testi.com'])
    const data = {
      name: 'Testi Testi',
      email: 'testi.testi@testi.com',
      password: 'password123'
    }

    const response = await supertest(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .send(data)
    loggedInUser.id = response.body.id
    loggedInUser.email = response.body.email
    loggedInUser.token = response.body.token
  })

  afterAll(async() => {
    const deleteQuery = `DELETE FROM articles WHERE title LIKE 'Desk' AND price LIKE '20';`;
    connection.query(deleteQuery, (err, result) => {
      if(err) {
        console.log(err);
      }
    });
  });

  test('should create a new article', async() => {
    const article = {
      title: 'Desk',
      price: '20',
      email: loggedInUser.email,
      userId:loggedInUser.id,

    }

    const response = await supertest(app)
      .post('/api/articles')
      .set('Accept', 'application/json')
      .set('Content', 'application/json')
      .set('Authorization', 'Bearer ' + loggedInUser.token)
      .send(article);

    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toEqual('Desk');
    expect(response.body.price).toEqual('20');
  });
});
