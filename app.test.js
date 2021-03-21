//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

chai.use(chaiHttp);

//Наш основной блок
describe('Notes', () => {
/*
  * Тест для /GET 
  */
  describe('/GET Notes', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/notes/all')
            .end((err, res) => {
              res.should.have.status(200)
            done();
            });
      });
  });

});