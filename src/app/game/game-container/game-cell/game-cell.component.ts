import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent implements OnInit {

  @Input() cellName: string;

  constructor() {
  }

  ngOnInit() {
  }

}
