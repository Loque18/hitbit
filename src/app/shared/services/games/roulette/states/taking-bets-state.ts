import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

class TakingBetsState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.TAKING_BETS,
    };

    onEnter(context: RouletteContext): void {
        // context.controller.openBets();
        // context.controller.updateGame();
        // setTimeout(() => {
        //     context.controller.changeState(GameState.SPINNING);
        // }, rouletteContstants.BETTING_TIME);
    }

    update(): void {}

    onExit(context: RouletteContext): void {
        // context.controller.closeBets();
    }
}

export { TakingBetsState };
