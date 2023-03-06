import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

/**
 *
 * shift array {{spin}} times
 * [b] [s] [b] [s] [b] [G]
 * [s] [b] [s] [b] [G] [b]
 * [b] [s] [b] [G] [b] [s]
 *
 * [s] [b] [G] [b] [s] [b]
 */

class SpinningState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.SPIN,
    };

    onEnter(context: RouletteContext): void {
        // const { controller } = context;
        // // get latests bets
        // const { coins } = context.getRouletteProps();
        // const results: Results = this.getRoundResults(coins);
        // const winningBets = this.computeWinningBets(context.getRouletteProps().roundValues.bets, results);
        // controller.setResults(results);
        // controller.setWinners(winningBets);
        // setTimeout(() => {
        //     controller.changeState(GameState.SHOWING_RESULTS);
        // }, rouletteContstants.SPIN_TIME);
        // controller.updateGame();
    }

    update(): void {
        // spin logic
    }

    onExit(): void {
        //
    }
}

export { SpinningState };
