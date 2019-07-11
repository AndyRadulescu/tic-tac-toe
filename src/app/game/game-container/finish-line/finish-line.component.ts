import {Component, Input, OnInit} from '@angular/core';
import {FinishLinePosition} from '../../interfaces/interfaces';

@Component({
  selector: 'app-finish-line',
  templateUrl: './finish-line.component.html',
  styleUrls: ['./finish-line.component.scss']
})
export class FinishLineComponent implements OnInit {

  @Input() position: FinishLinePosition;

  constructor() {
  }

  ngOnInit() {
  }

}
