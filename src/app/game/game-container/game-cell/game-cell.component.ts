import {Component, Input, OnInit} from '@angular/core';
import {EmitterService} from '@ngxs-labs/emitter';
import {GameState} from '../../core/game.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent implements OnInit {

  @Input() cellName: string;
  @Select(GameState)
  public counter$: Observable<number>;

  constructor(public emitter: EmitterService) {
  }

  ngOnInit() {
  }

  public move() {
    this.emitter.action(GameState.addMovement).emit(this.cellName);
  }
}
