import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const events = {
    global: {
        connect: 'connect',
    },

    games: {
        roulette: {
            update: 'roulette:update',
        },
    },
};

@Injectable({
    providedIn: 'root',
})
export class WebsocketsService {
    private _socketInstance: WebSocket;

    constructor() {
        this._socketInstance = new WebSocket(environment.wsUrl);
    }

    public on(event: string, callback: (data: any) => void) {
        // verify that event is valid
        if (!this._isValidEvent(event)) {
            throw new Error(`Invalid socket event: ${event}`);
        }

        // this._socketInstance.addEventListener(event, (e: MessageEvent) => {
        // });
    }

    private _isValidEvent(event: string): boolean {
        // return event.split(':').every((e) => events.hasOwnProperty(e));
        return true;
    }
}
