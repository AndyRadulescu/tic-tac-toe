import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'XandZero';

  ngOnInit(): void {
    console.log('%c Stop!!!', 'background: #222; color: red; font-size:30px');
  }
}
