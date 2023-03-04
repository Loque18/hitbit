import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const events = {
    global: {
        connect: 'open',
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

    private _connected: boolean = false;

    constructor() {
        this._socketInstance = new WebSocket(environment.wsUrl);
    }

    public onConnect(callback: () => void) {
        this._socketInstance.addEventListener(events.global.connect, () => {
            this._connected = true;

            callback();
        });
    }

    public on(event: string, callback: (data: any) => void) {
        // verify that event is valid
        if (!this._isValidEvent(event)) {
            throw new Error(`Invalid socket event: ${event}`);
        }

        // this._socketInstance.addEventListener(event, (e: MessageEvent) => {
        // });
    }

    public emit(data: string) {
        if (!this._connected) {
            throw new Error('Please verify that you are connected to the socket, before emitting data');
        }

        this._socketInstance.send(data);
    }

    private _isValidEvent(event: string): boolean {
        // return event.split(':').every((e) => events.hasOwnProperty(e));
        return true;
    }
}
