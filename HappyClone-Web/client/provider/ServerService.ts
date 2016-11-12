import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class ServerService{

    googleKey = 'AIzaSyBjIBpLHeRzZ27j5Q3qek6gIulGP5psD_U';

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

    GetNearByRestaurant(lat, lng, type, keyword){

        let obj = {
            mylat : lat,
            mylng : lng,
            mytype : type,
            mykeyword : keyword
        };
        let body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // return this.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mylat},${mylng}&radius=2000&type=${mytype}&keyword=${mykeyword}&key=AIzaSyBjIBpLHeRzZ27j5Q3qek6gIulGP5psD_U`).map((res: Response) => res.json());
        return this.http.post(`login/restaurant-near-me`, body, options).map((res:Response) => res.json());


    }


}
