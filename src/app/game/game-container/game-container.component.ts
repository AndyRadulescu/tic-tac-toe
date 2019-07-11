import {Component, OnInit} from '@angular/core';
import {GameState} from '../core/game.state';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Game} from '../core/models';
import {CellPosition} from '../interfaces/interfaces';
import FinishGame from '../utils/finish-game';
import {EmitterService} from '@ngxs-labs/emitter';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit {
  public cells: CellPosition[];
  @Select(GameState)
  public gameState$: Observable<Game>;
  public position: any;

  constructor(private emitter: EmitterService) {
    this.cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cells.push({i, j});
      }
    }
  }

  ngOnInit() {
    const finish = new FinishGame();
    this.gameState$.subscribe(data => {
      const finishLine = finish.verifyFinish(data.movementArray);
      if (!finishLine) {
        return;
      } else {
        this.position = finishLine;
        this.emitter.action(GameState.finishGame).emit();
      }
    });
  }

}
