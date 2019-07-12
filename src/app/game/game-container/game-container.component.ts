import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameState} from '../core/game.state';
import {Select} from '@ngxs/store';
import {fromEvent, Observable, Subscription, timer} from 'rxjs';
import {Game} from '../core/models';
import {CellPosition, FinishLinePosition} from '../interfaces/interfaces';
import FinishGame from '../utils/finish-game';
import {EmitterService} from '@ngxs-labs/emitter';
import * as devTools from 'devtools-detect';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';


@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  public cells: CellPosition[];
  public position: FinishLinePosition | boolean;

  @Select(GameState)
  public gameState$: Observable<Game>;
  private subscription: Subscription;
  private timerSubscription: Subscription;
  private consoleSubscription: Subscription;

  constructor(private emitter: EmitterService, private router: Router) {
    this.cells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.cells.push({i, j});
      }
    }
  }

  ngOnInit() {
    const isOpen = devTools.isOpen;
    this.consoleSubscription = fromEvent(window, 'devtoolschange').subscribe(data => {
      if ((data as devTools.DevToolsEvent).detail.isOpen === false) {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
      } else {
        console.log('%c YOU WILL BE REDIRECTED TO LOGIN IN 5 SECONDS!', 'background: #222; color: red; font-size:30px');
        this.timerSubscription = timer(5000).pipe(take(1)).subscribe(next => {
          this.router.navigate(['/home']);
        });
      }
    });

    const finish = new FinishGame();
    this.subscription = this.gameState$.subscribe(data => {
      const finishLine = finish.verifyFinish(data.movementArray);
      if (!finishLine) {
        return;
      } else {
        this.position = finishLine;
        this.emitter.action(GameState.finishGame).emit();
      }
    });
  }

  ngOnDestroy(): void {
    this.consoleSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
