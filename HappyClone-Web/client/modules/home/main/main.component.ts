import {Component, AfterViewInit, NgZone} from '@angular/core';
import {ServerService} from "../../../provider/ServerService";

declare var firebase;
declare var $;

declare var google;

declare var TweenMax;
declare var Bounce;
declare var Circ;
declare var Back;

@Component({
    selector: 'main-page',
    styleUrls: ['client/modules/home/main/main.component.css'],
    templateUrl: `client/modules/home/main/main.component.html`,
})
export class MainPage implements AfterViewInit {


    zone;

    constructor(private serverService: ServerService) { }

    ngAfterViewInit(){
        this.zone = new NgZone({enableLongStackTrace: false});
        let valueChanged = firebase.database().ref("/Listener");

        valueChanged.on("value", (snapshot) => {

            let obj = snapshot.val();
            console.log(obj);


            this.zone.run(() => {
                Object.keys(obj).forEach((key) => {
                    if(obj[key].active === 1){
                        this[key](key, obj);
                    }
                });
            });

        });

        var south_plainfield = {lat: 40.5792700, lng: -74.4115400};

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: south_plainfield
        });

        var marker = new google.maps.Marker({
            position: south_plainfield,
            map: map
        });


        google.maps.event.addListener(map, "idle", function(){
            google.maps.event.trigger(map, 'resize');
        });

        // Zoom Level
        // 1 World
        // 5 Landmasscontinent
        // 10 City
        // 15 Streets
        // 20 Buildings


    }

    refreshSkill(skill){
        this.serverService.Refresh_ActiveSkill(skill).subscribe(
            (data) => {
                console.log("Sucessfylly changed the data");
            }, (err) => {
                console.log(err);
            }
        );
    }

    WhoAreYou(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

}






































