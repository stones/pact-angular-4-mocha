import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ContentService } from './content';
import * as Chai from 'chai';
import  * as ChaiSpies  from 'chai-spies';
import 'mocha';

Chai.use(ChaiSpies);

const expect = Chai.expect;

describe(`Content Service`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ContentService],
    }).compileComponents();
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should return default content', (done) => {
    let service: ContentService = getTestBed().get(ContentService);
    let stub = Chai.spy(service.http.get);
    service.retrieveContent('non_existent_key');
    expect(stub).to.have.been.called;
    done();
  });
});
