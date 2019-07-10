import {State, StateContext} from '@ngxs/store';
import {EmitterAction, Receiver} from '@ngxs-labs/emitter';
import {Game} from './models';

@State<Game>({
  name: 'game',
  defaults: {
    score: 0,
    xTurn: true,
    movementArray: [],
  }
})
export class GameState {
  @Receiver()
  public static addMovement({setState, getState}: StateContext<Game>, {payload}: EmitterAction<string>): void {
    const state = getState();
    const movementArray = state.movementArray;
    if (!movementArray.includes(payload)) {
      movementArray.push(payload);
      setState({
        ...state,
        movementArray,
        xTurn: !state.xTurn
      });
    }
    console.log(getState());
  }

  @Receiver()
  public static reset({setState, getState}: StateContext<Game>): void {
    setState({
      ...getState(),
      xTurn: true,
      movementArray: []
    });
  }
}
