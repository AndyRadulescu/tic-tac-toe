import {CellPosition} from '../interfaces/interfaces';

export interface Game {
  score: number;
  xTurn: boolean;
  movementArray: IMovement[];
}

export interface IMovement {
  cellId: CellPosition;
  movement: string;
}
