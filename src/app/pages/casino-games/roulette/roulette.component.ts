import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { R_ActiveGameResponse } from 'src/api/responses/response';

import { Iroulette, image } from 'src/app/constants/roulette-game';

import { Bet } from 'src/app/shared/models/game/bet';

import { ROULETTE_COINS, RouletteCoin } from 'src/app/shared/models/roulette/coin';
import { RouletteService } from 'src/app/shared/services/games/roulette/roulette.service';

enum Coin {
    BRONZE = 'bronze',
    SILVER = 'silver',
    GOLD = 'gold',
}

@Component({
    templateUrl: './roulette.component.html',
    styleUrls: ['./roulette.component.scss'],
})
export class RouletteComponent implements AfterViewInit {
    constructor(private gameService: RouletteService) {}

    images: Iroulette[] = image;

    protected _coins: RouletteCoin[] = ROULETTE_COINS;

    @ViewChild('coinsTrack') private coinsTrack!: ElementRef;
    protected squareWidth!: number;

    ngAfterViewInit() {
        // initial state
        const elmt: HTMLElement = this.coinsTrack.nativeElement;
        const firstChild: HTMLElement = elmt.children[0] as HTMLElement;
        this.squareWidth = firstChild.offsetWidth;
        this.initialPosition();

        this.gameService.updateStream$.subscribe((data: R_ActiveGameResponse) => {});
    }

    public _spin(): void {
        const randomNumber = Math.floor(Math.random() * 9);
        const spinNumber = Math.floor(Math.random() * 14);

        this.spin(randomNumber, spinNumber);
    }

    private spin(randomNumber: number, spinNumber: number): void {
        const winnerIndex = (randomNumber + spinNumber) % 15;

        const track: HTMLElement = this.coinsTrack.nativeElement;

        const HALFWIDTH_CONTAINER = track.offsetWidth / 2;

        const ONE_TRACK_WIDTH = this._coins.length * this.squareWidth;

        const ALL_TRACKS_WIDH = this._coins.length * 3 * this.squareWidth;

        const OFFSET_TO_WINNING_COIN = winnerIndex * this.squareWidth;

        const s = Math.random() > 0.5 ? 1 : -1;
        const randomOffset = s * Math.floor(Math.random() * (this.squareWidth / 2));

        const winningPosition =
            HALFWIDTH_CONTAINER - ONE_TRACK_WIDTH - ALL_TRACKS_WIDH - OFFSET_TO_WINNING_COIN - this.squareWidth / 2;

        // 3
        track.style.transitionDuration = '3s';
        track.style.transitionTimingFunction = 'cubic-bezier(0.12, 0.8, 0.38, 1)';
        track.style.transform = `translateX(${winningPosition + randomOffset}px)`;

        const moveBackToCenter = () => {
            track.style.transitionDuration = '1s';
            track.style.transitionTimingFunction = 'cubic-bezier(0.12, 0.8, 0.38, 1)';
            track.style.transform = `translateX(${winningPosition}px)`;

            track.removeEventListener('transitionend', moveBackToCenter);

            const moveBackToStart = () => {
                this.moveBackToStart(winnerIndex);

                track.removeEventListener('transitionend', moveBackToStart);
            };

            track.addEventListener('transitionend', moveBackToStart);
        };

        track.addEventListener('transitionend', moveBackToCenter);
    }

    private moveBackToStart(winningIndex: number): void {
        const track: HTMLElement = this.coinsTrack.nativeElement;

        const ONE_TRACK_WIDTH = this._coins.length * this.squareWidth;
        const OFFSET_TO_WINNING_COIN = winningIndex * this.squareWidth + this.squareWidth / 2;
        const HALFWIDTH_CONTAINER = track.offsetWidth / 2;

        // prettier-ignore
        const temp = - (ONE_TRACK_WIDTH + OFFSET_TO_WINNING_COIN - HALFWIDTH_CONTAINER);

        track.style.transitionDuration = '0s';
        track.style.transitionTimingFunction = 'unset';
        track.style.transform = `translateX(${temp}px)`;
    }

    private initialPosition(): void {
        this.moveBackToStart(0);
    }

    protected get allCoins(): RouletteCoin[] {
        const c = this._coins;
        return [...c, ...c, ...c, ...c, ...c, ...c, ...c];
    }

    // *~~*~~*~~ Component actions ~~*~~*~~* //

    betForm: FormGroup = new FormGroup({
        betAmount: new FormControl(0),
        betCoin: new FormControl(Coin.BRONZE),
    });

    placeBet(): void {
        // ...
        // if (this.game.round.state !== GameState.WAITING_FOR_BETS) return;
        // const { betAmount, betCoin } = this.betForm.value;
        // const bet: Bet = {
        //     amount: betAmount,
        //     coinType: betCoin,
        //     player: this.player,
        // };
        // this.game.placeBet(bet);
        // this.resetForm();

        alert(JSON.stringify(this.betForm.value, null, 2));
    }

    private resetForm(): void {
        this.betForm.value['betAmount'] = 0;
    }
}
