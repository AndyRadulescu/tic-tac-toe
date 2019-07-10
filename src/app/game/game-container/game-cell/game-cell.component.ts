import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EmitterService} from '@ngxs-labs/emitter';
import {GameState} from '../../core/game.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {Game} from '../../core/models';
import {take} from 'rxjs/operators';

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

  @Input() cellName: string;
  @Select(GameState)
  public counter$: Observable<Game>;
  public cellValue: string;
  private subscription;

  constructor(public emitter: EmitterService) {
  }

  ngOnInit() {
    this.subscription = this.counter$.subscribe(data => {
      console.log(data);
      if (data.movementArray.length === 0) {
        this.cellValue = undefined;
      }
    });
  }

  public move(): void {
    if (this.cellValue !== undefined) {
      return;
    }
    this.counter$.pipe(take(1))
      .subscribe(data => {
        this.cellValue = GameCellComponent.XorO[data.xTurn.toString()];
      });
    this.emitter.action(GameState.addMovement).emit(this.cellName);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
