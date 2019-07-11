import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmitterService} from '@ngxs-labs/emitter';
import {GameState} from '../../core/game.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {Game, IMovement} from '../../core/models';
import {take} from 'rxjs/operators';
import {CellPosition} from '../../interfaces/interfaces';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent implements OnInit, OnDestroy {

  static XorO = {
    true: 'X',
    false: '0'
  };

  @Input() cellPosition: CellPosition;
  @Select(GameState)
  public gameState: Observable<Game>;
  public cellValue: string;
  private subscription;

  constructor(public emitter: EmitterService) {
  }

  ngOnInit() {
    this.subscription = this.gameState.subscribe(data => {
      if (data.movementArray.length === 0) {
        this.cellValue = undefined;
      }
    });
  }

  public move(): void {
    if (this.cellValue !== undefined) {
      return;
    }
    this.gameState.pipe(take(1))
      .subscribe(data => {
        this.cellValue = GameCellComponent.XorO[data.xTurn.toString()];
        this.emitter.action(GameState.addMovement).emit({cellId: this.cellPosition, movement: this.cellValue} as IMovement);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
