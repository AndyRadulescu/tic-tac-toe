import {State, StateContext} from '@ngxs/store';
import {EmitterAction, Receiver} from '@ngxs-labs/emitter';
import {Game, IMovement} from './models';

@State<Game>({
  name: 'game',
  defaults: {
    score: {x: 0, o: 0},
    isPlaying: true,
    xTurn: true,
    movementArray: [],
  }
})
export class GameState {
  @Receiver()
  public static addMovement({setState, getState}: StateContext<Game>, {payload}: EmitterAction<IMovement>): void {
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
  }

  @Receiver()
  public static reset({setState, getState}: StateContext<Game>): void {
    setState({
      ...getState(),
      xTurn: true,
      isPlaying: true,
      movementArray: []
    });
  }

  @Receiver()
  public static finishGame({setState, getState}: StateContext<Game>): void {
    const state = getState();
    const newScore = GameState.manageScore(state);
    setState({
      ...state,
      score: newScore,
      isPlaying: false
    });
  }

  private static manageScore(state: Game) {
    const lastItem = state.movementArray.pop();
    if (lastItem.movement === 'X') {
      return {
        ...state.score,
        x: state.score.x + 1
      };
    } else {
      return {
        ...state.score,
        o: state.score.o + 1
      };
    }
  }

}
