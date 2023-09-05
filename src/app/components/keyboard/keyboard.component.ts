import {
  Component, ElementRef, HostListener, QueryList, ViewChildren
} from '@angular/core';

import {KeyboardListenerService} from "../../services/keyboard-listener.service";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {

  constructor(private keyboardListenerService: KeyboardListenerService) {
  }

  // @HostListener cannot be used in a service, will have to pass variables to service
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    let key = event.key
    if (" " === event.key) {
      key = "Space"
      event.preventDefault() // Prevents checking and unchecking focused checkbox (i.e. dark mode switch)
    }
    if ("Escape" === event.key) {
      // TODO: fullscreen feature that hides the header and other things
      // fullScreen = false
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

    for (let element of this.keys.toArray()) {
      if (key.toLowerCase() === element.nativeElement.innerText.toLowerCase()) {
        if (key.toLowerCase() === "backspace") {
          if ("keydown" === event.type) {
            this.keyboardListenerService.updateCurrentKey(key)
            return this.keyPress(element.nativeElement, false)
          }
        }
        else if ("keyup" === event.type) {
          this.keyboardListenerService.updateCurrentKey(key)
          return this.keyPress(element.nativeElement, true)
        }
        if (key.toLowerCase() === "backspace") {
          return this.keyPress(element.nativeElement, true)
        }
        return this.keyPress(element.nativeElement, false)
      }
    }
    return
  }

  @ViewChildren('key')
  keys!: QueryList<ElementRef<HTMLElement>>

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  keyPress(elem: HTMLElement, reset?: boolean): string | void {
    if (reset && elem.className.includes("key")) {
      if (elem.className.includes("pressed")) {
        return elem.className = elem.className.slice(0, elem.className.indexOf(" pressed"))
      }

      return;
    }

    if (!elem.className.includes("key")) {
      return elem.className += " key";
    }

    if (false === reset && !elem.className.includes("pressed")) {
      return elem.className += " pressed"
    }
  }
}
