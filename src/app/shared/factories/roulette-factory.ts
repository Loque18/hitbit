import { RouletteRound } from '../models/roulette/roulette-round';
import { RouletteState } from '../models/roulette/roulette-states';

import { R_ActiveGameResponse } from 'src/api/responses/response';

class RouletteFactory {
    public static createRound(): RouletteRound {
        return {
            id: '',
            state: RouletteState.GAME_INIT,

            spinNumber: null,
            winningNumber: null,

            spinTimeStart: null,
            spinTimeEnd: null,
        };
    }

    public static createNullStreamDataResponse(): R_ActiveGameResponse {
        return {
            state: RouletteState.NULL,
            hash: '',
            'round-id': '',
            times: {
                game_init: { start: 0, end: 0 },
                taking_bets: { start: 0, end: 0 },
                spin: { start: 0, end: 0 },
                show_results: { start: 0, end: 0 },
            },
            winningNumber: null,
            spinNumber: null,
        };
    }
}

export { RouletteFactory };
