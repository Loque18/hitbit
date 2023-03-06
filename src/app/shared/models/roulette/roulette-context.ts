import { R_ActiveGameResponse } from 'src/api/responses/response';
import { RouletteCoin } from './coin';
import { RouletteRound } from './roulette-round';
import { RouletteState } from './roulette-states';

type RouletteContext = {
    controller: {
        openBets: () => void;
        closeBets: () => void;

        getStreamData: () => R_ActiveGameResponse;

        setResults: (restuls: any) => void;

        changeState: (state: RouletteState) => void;

        updateRound: () => void;
    };

    getRouletteProps: () => {
        coins: Readonly<RouletteCoin[]>;
        round: Readonly<RouletteRound>;
    };
};

export { RouletteContext };
