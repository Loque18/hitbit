import { State } from 'src/app/shared/state-machine/state';
import { StateProps } from 'src/app/shared/state-machine/state-props';

import { RouletteContext } from 'src/app/shared/models/roulette/roulette-context';
import { RouletteState } from 'src/app/shared/models/roulette/roulette-states';
import { RouletteFactory } from 'src/app/shared/factories/roulette-factory';
import { R_ActiveGameResponse } from 'src/api/responses/response';
import { RouletteRound } from 'src/app/shared/models/roulette/roulette-round';

class GameInitState extends State<RouletteContext> {
    props: StateProps = {
        name: RouletteState.GAME_INIT,
    };

    onEnter(context: RouletteContext): void {
        const { controller } = context;

        const streamData = controller.getStreamData();

        const times = streamData.times.game_init;

        const round = this.getNewRound(streamData);

        // calculate seconds between start and end of the state
        const timeForNextState = this.getNextStateTime(times.start, times.end);

        setTimeout(() => {
            controller.changeState(RouletteState.TAKING_BETS);
        }, timeForNextState * 1000);

        controller.updateRound(round);

        controller.streamRound();
    }

    update(): void {
        //
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
    getNextStateTime(startTime: number, endTime: number): number {
        return endTime - startTime;
    }

    getNewRound(lastStreamData: R_ActiveGameResponse): RouletteRound {
        let r = RouletteFactory.createRound();

        r = {
            ...r,
            id: lastStreamData['round-id'],
        };

        return r;
    }
}

export { GameInitState };
