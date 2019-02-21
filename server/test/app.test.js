const request = require('supertest');
const knex = require('../db/knex');
const app = require('../app');
const expect = require('chai').expect;
const fixtures = require('./fixtures');

describe('posts', () => {
    before((done) => {
        //run migrations
        knex.migrate.latest()
        //run seeds
        .then(() =>{
            return knex.seed.run();
        }).then(() => done());
    });

    it('Lists Posts', (done) => {
        request(app)
        .get('/api')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('array');
            expect(response.body).to.deep.equal(fixtures.posts);
            done();
      });
    });

    it('Lists Individual Post', (done) => {
        request(app)
        .get('/api/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.singlePost);
            done();
      });
    });

});
