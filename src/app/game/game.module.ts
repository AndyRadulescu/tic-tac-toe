import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameContainerComponent} from './game-container/game-container.component';
import {GameRoutingModule} from './game-routing.module';
import {GameCellComponent} from './game-container/game-cell/game-cell.component';


@NgModule({
  declarations: [GameContainerComponent, GameCellComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule {
}
