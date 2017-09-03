import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ContentService } from './content';
import * as Chai from 'chai';
import * as ChaiSpies  from 'chai-spies';
import 'mocha';
import * as Pact from 'pact';
const { somethingLike: like, term } = Pact.Matchers;

Chai.use(ChaiSpies);

const expect = Chai.expect;

const provider = Pact({
  consumer: 'ExampleFrontEnd',
  provider: 'ExampleBackEnd',
  port: 2222,
  cors: true,
  host: 'localhost',
  log: './logs',
  dir: './pacts',
  logLevel: 'WARN',
});

describe(`The pact with our provider`, () => {
  before(() => provider.setup());
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ContentService],
    })
      .compileComponents();
  });

  afterEach(() => getTestBed().resetTestingModule());

  describe('the retrieve content endpoint', () => {
    describe('when a key doesn\'t exist', () => {
      before(() => {
        return provider.addInteraction({
          state: 'default',
          uponReceiving: 'A request for content that doesn\'t exist',
          withRequest: {
            method: 'GET',
            path: '/content/non_existent_key',
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: {
              body: 'No content was found'
            }
          }
        })
          .then(() => true, (err) => console.log(err));
      });

      it('returns a default message', (done) => {
        let service: ContentService = getTestBed().get(ContentService);
        service.retrieveContent('non_existent_key').subscribe((res) => {
          expect(res).to.equal('No content was found');
        });
        done();
      });

      it('should validate the interactions and create a contract',
        () => provider.verify()
          .then(() => true, (err) => console.log(err)));
    });

    describe('when the provided key exists', () => {
      before(() => {
        return provider.addInteraction({
          state: 'default',
          uponReceiving: 'A request for content',
          withRequest: {
            method: 'GET',
            path: '/content/dashboard_greeting',
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: {
              body: 'Welcome to the dashboard'
            }
          }
        })
          .then(() => true, (err) => console.log(err));
      });

      it('should return a message', (done) => {
        let service: ContentService = getTestBed().get(ContentService);
        service.retrieveContent('dashboard_greeting').subscribe((temp) => {
          expect(temp).to.equal('Welcome to the dashboard');
        });
        done();
      });

      it('returns a default message',
        () => provider.verify()
          .then(() => true, (err) => console.log(err)));
    });
  });

  after(() => {
    return provider.finalize()
      .then(() => true, (err) => console.log(err));
  });
});
