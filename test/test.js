const assert = require('assert'),
      server = require('../app'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      debug = require('debug')('TDS:test'),
      should = chai.should();


chai.use(chaiHttp);

describe('Check endpoint', function() {
    it('should respond with JSON object', function(done) {
        chai.request(server)
        .get('/')
        .end((err, res) => {
              debug(res);
              res.should.have.status(200);
              res.body.should.be.a('Object');
              res.headers["content-type"].should.contains('application/json');
          done();
        });
    });
    after(async () => {
      require('../app').stop();
    });
  });