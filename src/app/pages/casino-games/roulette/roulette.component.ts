import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RouletteService } from 'src/app/shared/services/games/roulette/roulette.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ToastrService } from 'ngx-toastr';

import { Iroulette, image } from 'src/app/constants/roulette-game';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { ROULETTE_COINS, RouletteCoin } from 'src/app/shared/models/roulette/coin';
import { RouletteRound } from 'src/app/shared/models/roulette/roulette-round';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

import { AppModals } from 'src/static/app.modals';

enum Coin {
    BRONZE = 'bronze',
    SILVER = 'silver',
    GOLD = 'gold',
}

@Component({
    templateUrl: './roulette.component.html',
    styleUrls: ['./roulette.component.scss', './roulette-game.component.scss'],
})
export class RouletteComponent implements AfterViewInit {
    constructor(
        protected game: RouletteService,
        private toastr: ToastrService,
        protected authSvc: AuthService,
        protected modalService: ModalCoreService
    ) {}

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

        this.game.updateStream$.subscribe((data: RouletteRound) => {
            if (data.state === RouletteState.SPIN) {
                this.spin(data.spinNumber as number);
            }
        });
    }

    private spin(spinNumber: number): void {
        const winnerIndex = spinNumber;

        const track: HTMLElement = this.coinsTrack.nativeElement;

        const HALFWIDTH_CONTAINER = track.offsetWidth / 2;

        const ONE_TRACK_WIDTH = this._coins.length * this.squareWidth;

        const ALL_TRACKS_WIDH = this._coins.length * 3 * this.squareWidth;

        const OFFSET_TO_WINNING_COIN = winnerIndex * this.squareWidth;

        const s = Math.random() > 0.5 ? 1 : -1;
        const randomOffset = s * Math.floor(Math.random() * (this.squareWidth / 2));

        const winningPosition =
            HALFWIDTH_CONTAINER - ONE_TRACK_WIDTH - ALL_TRACKS_WIDH - OFFSET_TO_WINNING_COIN - this.squareWidth / 2;

        const now = new Date().getTime() / 1000;

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

    // protected get prtg(): number {

    //     if(!this.game.round.spinTimeStart) return 0;

    //     const now = new Date().getTime();
    //     const target = this.game.round.spinTimeStart * 1000;

    //     const secondsToSpin = target - now / 1000;

    //     return
    // }

    // *~~*~~*~~ Component actions ~~*~~*~~* //

    betForm: FormGroup = new FormGroup({
        betAmount: new FormControl(0),
        betCoin: new FormControl(Coin.BRONZE),
    });

    placeBet(): void {
        // ...

        if (!this.authSvc.session.isAuthenticated) {
            return this.modalService.openModal(AppModals.LOGIN);
        }

        if (this.game.round.state !== RouletteState.TAKING_BETS) {
            this.toastr.error('Betting is not allowed at this time');
            return;
        }

        const { betAmount, betCoin } = this.betForm.value;

        // const bet: Bet = {
        //     amount: betAmount,
        //     coinType: betCoin,
        //     player: this.player,
        // };

        // try {
        //     this.game.placeBet(bet);
        // } catch (e) {
        //     this.toastr.error(e.message);
        // }

        this.resetForm();
    }

    private resetForm(): void {
        this.betForm.reset();
    }
}
