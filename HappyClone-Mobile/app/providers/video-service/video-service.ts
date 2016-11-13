import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

  constructor(private http: Http) {}

  SendTextToFireBase(text){
    console.log(text);

    let obj = {
      active: 1,
      respond: text
    };
    let body = JSON.stringify(obj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch("https://happyclone-76ed0.firebaseio.com/Listener/TextResponse/.json",body, options).map((res: Response) => res.json());



  }

}

