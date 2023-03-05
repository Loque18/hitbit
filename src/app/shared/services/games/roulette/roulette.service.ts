import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { WebsocketsService } from '../../websockets/websockets.service';

import { api } from 'src/api';

import { R_ActiveGameResponse } from 'src/api/responses/response';

@Injectable({
    providedIn: 'root',
})
export class RouletteService {
    private updateStreamSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public updateStream$ = this.updateStreamSub.asObservable();

    constructor(private http: HttpClient, private socket: WebsocketsService) {
        // socket.emit(event);

        socket.onConnect(() => {
            // setInterval(() => {
            //     const event = JSON.stringify({ event: 'updateRouletteSubscription' });

            //     socket.emit(event);
            // }, 30 * 1000);

            const event = JSON.stringify({ event: 'subscribeToRoulette' });
            this.socket.emit(event);

            socket.on('rouletteDataUpdate', (data: any) => {
                console.log(data);
            });

            // this.subscribeToRouletteUpdates();

            setInterval(() => {
                const event = JSON.stringify({ event: 'updateRouletteSubscription' });

                socket.emit(event);
            }, 30 * 1000);
        });
    }

    // private subscribeToRouletteUpdates() {
    //     const event = JSON.stringify({ event: 'subscribeToRoulette' });
    //     this.socket.emit(event);

    //     this.socket.on('rouletteDataUpdate', (data: R_ActiveGameResponse) => {
    //         console.log(data);

    //         const start = data.data.times.game_init.start;
    //         const end = data.data.times.game_init.end;

    //         const start_date = new Date(start);
    //         const end_date = new Date(end);

    //         console.log({
    //             start_date,
    //             end_date,
    //         });
    //     });
    // }

    public getCurrentGame(): Observable<any> {
        const url = api.games.roulette.activeGame;

        return this.http.get(url);
    }

    private _handleErorr(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
