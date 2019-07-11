import {Component, Input, OnInit} from '@angular/core';
import {FinishLinePosition} from '../../interfaces/interfaces';
import {Select} from '@ngxs/store';
import {GameState} from '../../core/game.state';
import {Observable} from 'rxjs';
import {Game} from '../../core/models';

@Component({
  selector: 'app-finish-line',
  templateUrl: './finish-line.component.html',
  styleUrls: ['./finish-line.component.scss']
})
export class FinishLineComponent implements OnInit {

  @Input() position: FinishLinePosition;
  @Select(GameState)
  public gameState$: Observable<Game>;

  public isHidden = true;

  constructor() {
  }

  ngOnInit() {
    this.gameState$.subscribe(data => {
      this.isHidden = data.isPlaying;
    });
  }

}
