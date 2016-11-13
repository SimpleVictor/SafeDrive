import { Component, OnInit } from '@angular/core';
import {MainPage} from "../main/main.component";

@Component({
    selector: 'phone-page',
    styleUrls: ['client/modules/home/phone/phone.component.css'],
    templateUrl: `client/modules/home/phone/phone.component.html`
})
export class PhonePage implements OnInit {
    constructor(public mainPage: MainPage) { }

    ngOnInit() { }

}
