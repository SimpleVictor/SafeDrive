import { Component } from '@angular/core';
import { NavController , ToastController} from 'ionic-angular';
import {VideoService} from "../../providers/video-service/video-service";

/*
  Generated class for the MorePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/more/more.html',
})
export class MorePage {

  textMessage;

  constructor(private navCtrl: NavController, private videoService: VideoService, public toastCtrl: ToastController) {

  }

  sendText(){

    console.log(this.textMessage);

    this.videoService.SendTextToFireBase(this.textMessage).subscribe(
      (data) => {
        console.log("Sucess!");
        let toast = this.toastCtrl.create({
          message: 'Text Was Sent Successfully. Give me a wink ;)',
          duration: 3000
        });
        toast.present();
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: 'IT FAILED!! WARN ME BROO',
          duration: 3000
        });
        toast.present();
        console.log(err);
      }
    )

  }

}
