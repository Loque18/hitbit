import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

class TakingBetsState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.TAKING_BETS,
    };

    onEnter(context: RouletteContext): void {
        const { controller } = context;

        controller.openBets();

        controller.streamRound();

        // setTimeout(() => {
        //     context.controller.changeState(RouletteState.SPIN);
        // }, timeForNextState * 1000);
    }

    update(): void {
        //
    }

    onExit(context: RouletteContext): void {
        const { controller } = context;

        controller.closeBets();
    }
}

export { TakingBetsState };
