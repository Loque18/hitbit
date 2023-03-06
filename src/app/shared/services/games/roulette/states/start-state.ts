import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';

class GameInitState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.GAME_INIT,
    };

    onEnter(context: RouletteContext): void {
        const { controller } = context;

        const streamData = controller.getStreamData();

        console.log('streamData', streamData);

        // timestamp of the start of this state
        const start_time = streamData.times.game_init.start;

        // timestamp of the end of this state
        const end_time = streamData.times.game_init.end;

        const timeForNextState = end_time - start_time;

        console.log({
            timeForNextState,
        });

        // controller.restart();
        // controller.updateGame();
        // setTimeout(() => {
        //     context.controller.changeState(GameState.WAITING_FOR_BETS);
        // }, 200);
    }

    update(): void {
        //
    }

    onExit(): void {
        //
    }
}

export { GameInitState };
