import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'homepage-casino-events',
    templateUrl: './casino-events.component.html',
    styleUrls: ['./casino-events.component.scss'],
})
export class CasinoEventsComponent implements OnInit {
    events = [
        {
            id: 1,
            date: '25/01/2023',
            title: 'DOUBLE YOUR REWARDS',
            description: 'Ex ipsum adipisicing adipisicing consectetur qui dolore irure nisi fugiat.',
            url: '/events/1',
            secondsToStart: 0,
            img: 'https://picsum.photos/400/200',
        },
        {
            id: 2,
            date: '07/02/2023',
            title: 'Title',
            description: 'Quis non adipisicing officia adipisicing esse ex mollit dolore ut cupidatat laboris sunt.',
            url: '/events/2',
            secondsToStart: 0,
            img: 'https://picsum.photos/400/200',
        },
    ];

    ngOnInit() {
        // const interval = setInterval(() => {
        //     this.events.forEach(event => {
        //         event.secondsToStart = Math.floor((new Date(event.date).getTime() - new Date().getTime()) / 1000);
        //     });
        // }, 1000);
    }
}
