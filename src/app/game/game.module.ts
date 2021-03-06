import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameContainerComponent} from './game-container/game-container.component';
import {GameRoutingModule} from './game-routing.module';
import {GameCellComponent} from './game-container/game-cell/game-cell.component';
import {NgxsEmitPluginModule} from '@ngxs-labs/emitter';
import {NgxsModule} from '@ngxs/store';
import {GameState} from './core/game.state';
import {ResetGameComponent} from './game-container/reset-game/reset-game.component';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {FinishLineComponent} from './game-container/finish-line/finish-line.component';
import {ScoreComponent} from './game-container/score/score.component';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';


@NgModule({
  declarations: [GameContainerComponent, GameCellComponent, ResetGameComponent, FinishLineComponent, ScoreComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgxsModule.forRoot([GameState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsEmitPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: 'game.score'})
  ]
})
export class GameModule {
}
