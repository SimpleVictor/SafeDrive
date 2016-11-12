import { Component } from "@angular/core";

@Component({
    selector: "app",
    template: `<router-outlet></router-outlet><welcome-page></welcome-page>`
})
export class AppComponent {

    constructor() {

    }

}
