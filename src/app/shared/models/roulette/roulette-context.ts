import { R_ActiveGameResponse } from 'src/api/responses/response';
import { RouletteCoin } from './coin';
import { RouletteRound } from './roulette-round';
import { RouletteState } from './roulette-states';

type RouletteContext = {
    controller: {
        openBets: () => void;
        closeBets: () => void;

        getStreamData: () => R_ActiveGameResponse;

        addToHistory: (coin: RouletteCoin) => void;

        updateRound: (round: RouletteRound) => void;

        changeState: (state: RouletteState) => void;

        streamRound: () => void;
    };

    getRouletteProps: () => {
        coins: Readonly<RouletteCoin[]>;
        round: Readonly<RouletteRound>;
    };
};

export { RouletteContext };
