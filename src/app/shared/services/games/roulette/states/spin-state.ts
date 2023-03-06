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
        const { controller } = context;

        const results = controller.getStreamData();

        // const winningBets = this.computeWinningBets(context.getRouletteProps().roundValues.bets, results);
        controller.setResults(results);
        // controller.setWinners(winningBets);

        const time = this.getNextStateTime(results.times.spin.start, results.times.spin.end);

        setTimeout(() => {
            controller.changeState(RouletteState.SHOW_RESULTS);
        }, time * 1000);

        controller.updateRound();
    }

    update(): void {
        // spin logic
    }

    onExit(): void {
        //
    }

    /**
     *
     * @param spinTimeStart timestamp in seconds of the roulette spin start
     * @param spinTimEnd timestamp in seocnds of the roulette spin end
     * @returns seconds to next state
     */
    getNextStateTime(spinTimeStart: number, spinTimeEnd: number): number {
        return spinTimeEnd - spinTimeStart;
    }
}

export { SpinningState };
