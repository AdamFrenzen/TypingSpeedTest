import {Component, DoCheck, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',]
})
export class AppComponent {
  title = 'TypingSpeedTest';

  darkMode: boolean = true

  //TODO: Communicate dark mode with header toggle

}
