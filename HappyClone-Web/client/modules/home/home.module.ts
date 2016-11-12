import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { routing } from "./home.routing";
import { SharedModule } from "../shared/shared.module";
import {MainPage} from "./main/main.component";
import {WelcomePage} from "./welcome/welcome.component";

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule,
    ],
    declarations: [
        MainPage,
        WelcomePage,
        HomeComponent
    ],
    bootstrap: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule { }
