import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class ServerService{

    constructor(private http: Http) { }


    Refresh_ActiveSkill(skill){
        let obj = {
            active: 0
        };
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.patch(`https://happyclone-76ed0.firebaseio.com/Listener/${skill}/.json`, body, options).map((res: Response) => res.json());
    }


    getAllConditions(){

        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('app_id', `7751ae71`);
        headers.append('app_key', `1f014d4a55c66b4bc4c4045426c0cfd9`);
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`https://api.infermedica.com/v2/conditions`,options).map((res: Response) => res.json());
    }


}
