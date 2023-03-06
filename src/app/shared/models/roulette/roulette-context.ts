import { R_ActiveGameResponse } from 'src/api/responses/response';
import { RouletteState } from './roulette-states';

type RouletteContext = {
    controller: {
        openBets: () => void;
        closeBets: () => void;

        getStreamData: () => R_ActiveGameResponse;

        changeState: (state: RouletteState) => void;

        updateRound: () => void;
    };
};

export { RouletteContext };
