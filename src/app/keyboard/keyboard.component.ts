import {
  AfterViewInit, Component, HostListener, ViewChildren
} from '@angular/core';

import {KeyboardListenerService} from "../keyboard-listener.service";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})

export class KeyboardComponent implements AfterViewInit {

  constructor(private keyboardListenerService: KeyboardListenerService) {
  }

  // @HostListener cannot be used in a service, will have to pass variables to service
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    for (let element of this.keys.toArray()) {
      let key = event.key
      if (" " === event.key) {
        key = "Space"
      }
      if ("/" === event.key) {
        key = "?"
      }
      if ("1" === event.key) {
        key = "!"
      }
      if ("9" === event.key) {
        key = "("
      }
      if ("0" === event.key) {
        key = ")"
      }

      if (key.toLowerCase() === element.nativeElement.innerText.toLowerCase()) {
        if ("keyup" === event.type) {
          this.keyboardListenerService.updateCurrentKey(key)
          return this.keyPress(element.nativeElement, true)
        }
        return this.keyPress(element.nativeElement, false)
      }
    }
    return
  }

  @ViewChildren('key')
  keys: any = []

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  keyPress(elem: HTMLElement, reset?: boolean) {

    if (reset && elem.className.includes("key")) {
      if (elem.className.includes("pressed")) {
        return elem.className = elem.className.slice(0, elem.className.indexOf(" pressed"))
      }
    } else if (!elem.className.includes("key")) {
      return elem.className += " key"
    }
    if (false === reset && !elem.className.includes("pressed")) {
      return elem.className += " pressed"
    }
    return
  }

  ngAfterViewInit() {
    //  ViewChildRefs are loaded
  }

}
