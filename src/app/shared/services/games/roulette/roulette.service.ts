import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsocketsService } from '../../websockets/websockets.service';

@Injectable({
    providedIn: 'root',
})
export class RouletteService {
    private updateStreamSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public updateStream$ = this.updateStreamSub.asObservable();

    constructor(private socket: WebsocketsService) {
        const event = JSON.stringify({ event: 'subscribeToRoulette' });

        // socket.emit(event);

        socket.onConnect(() => {
            socket.emit(event);

            setInterval(() => {
                const event = JSON.stringify({ event: 'updateRouletteSubscription' });

                socket.emit(event);
            }, 30 * 1000);

            socket.on('rouletteDataUpdate', (data: any) => {
                this.updateStreamSub.next(data);
            });
        });

        // setInterval(() => {
        //     const event = JSON.stringify({ event: 'updateRouletteSubscription' });

        //     socket.emit(event);
        // }, 30 * 1000);
    }
}
