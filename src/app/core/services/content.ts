import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ContentService {
  private API_PATH = 'http://localhost:2222';
  private token: string;

  public constructor(public http: Http) {
  }

  public retrieveContent(id: string) {
    const option = {
      headers: new Headers({ Authorization: `Bearer ${this.token}` }),
    };
    return this.http.get(`${this.API_PATH}/content/${id}`, option)
      .map((res) => {
        return res.json().body;
      });
  }
}
