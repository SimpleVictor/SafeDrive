
import { Component, AfterViewInit} from '@angular/core';

declare var $;

@Component({
    selector: 'lightswitch',
    styleUrls: ['client/modules/home/lightswitch/lightswitch.component.css'],
    templateUrl: `client/modules/home/lightswitch/lightswitch.component.html`
})
export class LightComponent implements AfterViewInit {
    constructor() { }

    ngAfterViewInit() {
        $('.icon').on('click', function () {
            if ($(this).hasClass('on')) {
                return $(this).removeClass('on');
            } else {
                return $(this).addClass('on');
            }
        });
    }

}
