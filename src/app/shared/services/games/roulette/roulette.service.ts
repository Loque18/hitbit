import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { WebsocketsService } from '../../websockets/websockets.service';

import { StateMachine } from 'src/app/shared/state-machine/state-machine';
import { GameInitState, SpinningState, TakingBetsState, ResultsState } from './states';

import { api } from 'src/api';

import { R_ActiveGameResponse } from 'src/api/responses/response';
import { Bet } from 'src/app/shared/models/game/bet';

import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';
import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteRound } from 'src/app/shared/models/roulette/roulette-round';

@Injectable({
    providedIn: 'root',
})
export class RouletteService {
    // *~~*~~*~~ GAME DATA ~~*~~*~~* //

    private _lastStremData!: R_ActiveGameResponse;

    private takingBets: boolean = false;

    private _initialState: RouletteState = RouletteState.GAME_INIT;

    private _round: RouletteRound = {
        id: '',
        state: this._initialState,
        spinNumber: null,
        winningNumber: null,
    };

    private _states = {
        [RouletteState.GAME_INIT]: new GameInitState(),
        [RouletteState.TAKING_BETS]: new TakingBetsState(),
        [RouletteState.SPIN]: new SpinningState(),
        [RouletteState.SHOW_RESULTS]: new ResultsState(),
    };

    private _machine = new StateMachine<RouletteContext>(this._states, {
        controller: {
            openBets: () => this._openBets(),
            closeBets: () => this._closeBets(),

            getStreamData: () => this._lastStremData,

            changeState: (state: RouletteState) => this._changeState(state),

            updateRound: () => this._updateRound(),
        },
    });

    // *~~*~~*~~ Streams ~~*~~*~~* //

    private updateStreamSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public updateStream$ = this.updateStreamSub.asObservable();

    // *~~*~~*~~ setters & getters ~~*~~*~~* //

    public get round(): Readonly<RouletteRound> {
        return this._round;
    }

    // *~~*~~*~~ INIT ~~*~~*~~* //

    constructor(private http: HttpClient, private socket: WebsocketsService) {
        socket.onConnect(() => {
            this.subscribeToRouletteUpdates();
        });
    }

    private subscribeToRouletteUpdates() {
        const event = JSON.stringify({ event: 'subscribeToRoulette' });
        this.socket.emit(event);

        this.socket.on('rouletteDataUpdate', (data: R_ActiveGameResponse) => {
            const state = data.state === 'game_start' ? RouletteState.GAME_INIT : RouletteState.SPIN;

            this._lastStremData = data;

            this._changeState(state);
        });

        setInterval(() => {
            const _heartBeat = JSON.stringify({ event: 'updateRouletteSubscription' });

            this.socket.emit(_heartBeat);
        }, 1000 * 10);
    }

    private getCurrentGame(): Observable<any> {
        const url = api.games.roulette.activeGame;

        return this.http.get(url);
    }

    private _handleErorr(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // *~~*~~*~~ Internal methods ~~*~~*~~* //

    private _openBets(): void {
        this.takingBets = true;
    }

    private _closeBets(): void {
        this.takingBets = false;
    }

    private _updateRound(): void {
        this.updateStreamSub.next(this.round);
    }

    private _changeState(state: RouletteState): void {
        this._round = {
            ...this._round,
            state,
        };

        this._machine.changeState(state);
    }

    // *~~*~~*~~ External methods ~~*~~*~~* //

    public placeBet(bet: Bet): any {
        // const url = api.games.roulette.placeBet;
        // return this.http.post(url, bet);
    }
}
