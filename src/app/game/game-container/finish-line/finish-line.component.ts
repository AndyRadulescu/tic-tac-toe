import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FinishLinePosition} from '../../interfaces/interfaces';
import {Select} from '@ngxs/store';
import {GameState} from '../../core/game.state';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../../core/models';

@Component({
  selector: 'app-finish-line',
  templateUrl: './finish-line.component.html',
  styleUrls: ['./finish-line.component.scss']
})
export class FinishLineComponent implements OnInit, OnDestroy {

  @Input() position: FinishLinePosition;
  @Select(GameState)
  public gameState$: Observable<Game>;
  private subscription: Subscription;

  public isHidden = true;

  constructor() {
  }

  ngOnInit() {
    this.subscription = this.gameState$.subscribe(data => {
      this.isHidden = data.isPlaying;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
