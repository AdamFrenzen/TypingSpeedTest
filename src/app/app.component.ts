import {Component, DoCheck, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {KeyboardListenerService} from "./services/keyboard-listener.service";
import {ColorModeService} from "./services/color-mode.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',]
})
export class AppComponent implements OnDestroy {
  
  subscription: Subscription

  constructor(
    private keyListener: KeyboardListenerService,
    private ColorMode: ColorModeService
  ) {
    this.subscription = this.ColorMode.getColorMode().subscribe(value => {
      this.colorMode = value
    });
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    return this.keyListener.setKey(event)
  }


  title = 'TypingSpeedTest';

  colorMode: boolean = true

  // subscription: Subscription


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  //TODO: Communicate dark mode with header toggle

}
