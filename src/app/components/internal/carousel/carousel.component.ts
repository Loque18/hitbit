import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { news, INew } from 'src/app/constants/news';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
    slides: INew[] = news;

    offset: number = 0;
    private offsetSub: BehaviorSubject<number> = new BehaviorSubject(this.offset);
    private offset$ = this.offsetSub.asObservable();

    @ViewChild('carouselTrack') track: ElementRef | undefined;

    private C_HEIGHT: number = 250;
    private TIMER: number = 50 * 1000;

    private interval: ReturnType<typeof setInterval> | undefined;

    ngOnInit() {
        this.offset$.subscribe(offset => {
            if (this.track) {
                console.log('offset', offset);

                const dir = offset < 0 ? 1 : -1;
                const track = this.track.nativeElement;

                track.style.transform = `translateY(${dir * offset * this.C_HEIGHT}px)`;
            }
        });

        // automatically scroll each 3 seconds
        this.interval = setInterval(() => {
            this.next();
        }, this.TIMER);
    }

    goTo(index: number): void {
        this.offset = index;
        this.offsetSub.next(this.offset);

        this.resetInterval();
    }

    next(): void {
        this.offset = (this.offset + 1) % this.slides.length;

        this.offsetSub.next(this.offset);

        this.resetInterval();
    }

    prev(): void {
        this.offset = (this.offset - 1 + this.slides.length) % this.slides.length;
        this.offsetSub.next(this.offset);

        this.resetInterval();
    }

    resetInterval(): void {
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.next();
        }, this.TIMER);
    }
}
