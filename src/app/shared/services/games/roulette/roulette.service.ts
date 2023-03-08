import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, of, switchMap, from, retry } from 'rxjs';

import { WebsocketsService } from '../../websockets/websockets.service';

import { StateMachine } from 'src/app/shared/state-machine/state-machine';
import { GameInitState, SpinningState, TakingBetsState, ResultsState } from './states';

import { api } from 'src/api';

import { RouletteCoin, ROULETTE_COINS } from 'src/app/shared/models/roulette/coin';

import { R_ActiveGameResponse } from 'src/api/responses/response';
import { Bet } from 'src/app/shared/models/game/bet';

import { RouletteFactory } from 'src/app/shared/factories/roulette-factory';

import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';
import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteRound } from 'src/app/shared/models/roulette/roulette-round';

@Injectable({
    providedIn: 'root',
})
export class RouletteService {
    // *~~*~~*~~ GAME DATA ~~*~~*~~* //

    public coins: Readonly<RouletteCoin[]> = ROULETTE_COINS;
    private _history: RouletteCoin[] = [];

    private takingBets: boolean = false;

    private _initialState: RouletteState = RouletteState.GAME_INIT;

    private _round: RouletteRound = RouletteFactory.createRound();

    private _states = {
        [RouletteState.GAME_INIT]: new GameInitState(),
        [RouletteState.TAKING_BETS]: new TakingBetsState(),
        [RouletteState.SPIN]: new SpinningState(),
        [RouletteState.SHOW_RESULTS]: new ResultsState(),
    };

    private _lastStremData!: R_ActiveGameResponse;

    private _machine = new StateMachine<RouletteContext>(this._states, {
        controller: {
            openBets: () => this._openBets(),
            closeBets: () => this._closeBets(),

            getStreamData: () => this._lastStremData,

            setResults: (results: any) => {
                const { winningNumber, spinNumber } = results;

                this._round = {
                    ...this._round,
                    spinNumber,
                    winningNumber,
                };
            },

            changeState: (state: RouletteState) => this._changeState(state),

            updateRound: () => this._updateRound(),
        },

        getRouletteProps: () => ({
            coins: this.coins,
            round: this.round,
        }),
    });

    // *~~*~~*~~ Streams ~~*~~*~~* //

    private updateStreamSub: BehaviorSubject<RouletteRound> = new BehaviorSubject<RouletteRound>(this._round);
    public updateStream$ = this.updateStreamSub.asObservable();

    // *~~*~~*~~ setters & getters ~~*~~*~~* //

    public get round(): Readonly<RouletteRound> {
        return this._round;
    }

    public get history(): Readonly<RouletteCoin[]> {
        return this._history;
    }

    // *~~*~~*~~ INIT ~~*~~*~~* //

    constructor(private http: HttpClient, private socket: WebsocketsService) {
        // socket.onConnect(() => {
        //     this.subscribeToRouletteUpdates();
        // });

        const sub = () => {
            if (socket.state === WebSocket.OPEN) {
                this.subscribeToRouletteUpdates();
            } else {
                socket.onConnect(() => {
                    this.subscribeToRouletteUpdates();
                });
            }
        };

        // 1. get current game
        this.getCurrentGame().subscribe((data: R_ActiveGameResponse) => {
            if (data.state === RouletteState.NULL) {
                // notify that there is an error
                return;
            }

            this._lastStremData = data;

            const { times } = data;

            const game_init1 = times.game_init.start;
            const game_init2 = times.game_init.end;

            const taking_bets1 = times.taking_bets.start;
            const taking_bets2 = times.taking_bets.end;

            const spin1 = times.spin.start;
            const spin2 = times.spin.end;

            const results1 = times.show_results.start;
            const results2 = times.show_results.end;

            const now = new Date().getTime() / 1000;

            let nextState = '';
            if (now > game_init1 && now < game_init2) {
                nextState = RouletteState.GAME_INIT;
            } else if (now > taking_bets1 && now < taking_bets2) {
                nextState = RouletteState.TAKING_BETS;
            } else if (now > spin1 && now < spin2) {
                nextState = RouletteState.SPIN;
            } else if (now > results1 && now < results2) {
                nextState = RouletteState.SHOW_RESULTS;
            }

            this._changeState(nextState as RouletteState);

            sub();
        });

        // 2. subscribe to updates
    }

    // *~~*~~*~~ Networking ~~*~~*~~* //

    private subscribeToRouletteUpdates() {
        const event = JSON.stringify({ event: 'subscribeToRoulette' });
        this.socket.emit(event);

        this.socket.on('rouletteDataUpdate', (data: R_ActiveGameResponse) => {
            this._lastStremData = data;

            switch (data.state) {
                case 'game_start':
                    this._changeState(RouletteState.GAME_INIT);
                    break;

                case 'results_state':
                    this._changeState(RouletteState.SPIN);
                    break;
            }
        });

        setInterval(() => {
            const _heartBeat = JSON.stringify({ event: 'updateRouletteSubscription' });

            this.socket.emit(_heartBeat);
        }, 1000 * 45);
    }

    unsubscribeFromRouletteUpdates() {
        const event = JSON.stringify({ event: 'unsubscribeFromRoulette' });
        this.socket.emit(event);

        // this.socket.off('rouletteDataUpdate');
    }

    /**
     * Get the current game from the server
     * if req fails for any reason create a null response
     *
     */
    private getCurrentGame(): Observable<R_ActiveGameResponse> {
        const url = api.games.roulette.activeGame;

        return this.http.get<{ event: string; data: R_ActiveGameResponse }>(url).pipe(
            switchMap((r: { event: string; data: R_ActiveGameResponse }) => {
                return of(r.data);
            }),
            catchError(this._handleError('getActiveGame', RouletteFactory.createNullStreamDataResponse()))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private _handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            // console.error(error); // log to console instead

            return of(result as T);
        };
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
        if (!this.takingBets) throw new Error('This game is not taking bets currently');

        // const url = api.games.roulette.placeBet;
        // return this.http.post(url, bet);
    }
}
