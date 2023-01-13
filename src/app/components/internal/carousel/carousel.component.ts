import { Component } from '@angular/core';

import { news, INew } from 'src/app/constants/news';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
    slides: INew[] = news;
}
