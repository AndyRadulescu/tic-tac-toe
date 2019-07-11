import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {GameState} from '../../core/game.state';
import {Observable} from 'rxjs';
import {Game} from '../../core/models';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public x = 0;
  public o = 0;

  @Select(GameState)
  private gameState$: Observable<Game>;

  constructor() {
  }

  ngOnInit() {
    this.gameState$.subscribe(data => {
      this.x = data.score.x;
      this.o = data.score.o;
    });
  }

}
