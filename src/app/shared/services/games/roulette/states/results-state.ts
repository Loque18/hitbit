import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

class ResultsState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.SHOW_RESULTS,
    };

    onEnter(context: RouletteContext): void {
        // const { controller } = context;
        // const { coins, roundValues } = kcontext.getRouletteProps();
        // setTimeout(() => {
        //     controller.changeState(GameState.GAME_START);
        // }, rouletteContstants.RESULTS_TIME);
        // controller.updateGame();
    }

    update(): void {
        //
    }

    onExit(): void {
        //
    }
}

export { ResultsState };
