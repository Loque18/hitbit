import { GameRound } from '../game/round';
import { RouletteState } from './roulette-states';

type RouletteRound = GameRound & {
    state: RouletteState;

    spinNumber: number | null;
    winningNumber: number | null;
};

export { RouletteRound };
