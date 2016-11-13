
import { Component, OnInit } from '@angular/core';
import {MainPage} from "../main/main.component";

@Component({
    selector: 'music-page',
    styleUrls: ['client/modules/home/music/music.component.css'],
    templateUrl: `client/modules/home/music/music.component.html`
})
export class MusicPage implements OnInit {
    constructor(public mainPage: MainPage) { }

    ngOnInit() { }

}
