import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomescreenComponent} from './homescreen/homescreen.component';


const routes: Routes = [
  {path: 'home', component: HomescreenComponent},
  {path: 'game', loadChildren: () => import('./game/game.module').then(module => module.GameModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
