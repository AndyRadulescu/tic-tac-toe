import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit {
  public cells = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];

  constructor() {
  }

  ngOnInit() {
    console.log('It Works!');
  }

}
