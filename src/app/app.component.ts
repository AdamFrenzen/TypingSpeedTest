import {Component, DoCheck, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {KeyboardListenerService} from "./services/keyboard-listener.service";
import {ColorModeService} from "./services/color-mode.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',]
})
export class AppComponent implements OnDestroy{
  title = 'TypingSpeedTest';

  colorMode: boolean = true

  subscription: Subscription

  constructor(private keyListener: ColorModeService) {
    this.subscription = this.keyListener.getColorMode().subscribe(value => {
      this.colorMode = value
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  //TODO: Communicate dark mode with header toggle

}
