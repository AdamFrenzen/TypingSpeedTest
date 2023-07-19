import {AfterViewInit, Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {KeyboardListenerService} from "../keyboard-listener.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription

  constructor(private keyListener: KeyboardListenerService) {
    this.subscription = this.keyListener.getCurrentKey().subscribe(key => {
      this.enterKey(key.text)
    });
  }

  paragraph: string =
    "Hello world, this is my typing speed test"
  words: string[][] = []
  letters: string[] = []
  currentLetterIndex: number = 0
  currentKey: string = ""

  @ViewChildren('letter')
  letterElements: any = []

  enterKey(key: string) {
    if (key === "Space") {
      key = " "
    }
    if (key === "Shift") {
      return
    }

    let letterElements: any[] = this.letterElements.toArray()

    if (key === this.currentKey) {

      letterElements[this.currentLetterIndex + 1].nativeElement.className = "p currentKey"
      letterElements[this.currentLetterIndex].nativeElement.className = "p correctKey"
      this.currentLetterIndex++

      this.currentKey = this.letters[this.currentLetterIndex]

    } else if ("Backspace" === key) {
      // TODO: hold down backspace
      if (this.currentLetterIndex !== 0) {

        this.currentLetterIndex--
        this.currentKey = this.letters[this.currentLetterIndex]

        letterElements[this.currentLetterIndex + 1].nativeElement.className = "p blankKey"
        letterElements[this.currentLetterIndex].nativeElement.className = "p currentKey"
      }
    } else {
      letterElements[this.currentLetterIndex].nativeElement.className = "p incorrectKey"
    }
  }

  ngOnInit() {

    for (let word of this.paragraph.split(" ")) {
      let wordArray: string[] = []
      for (let letter of word) {
        wordArray.push(letter)
      }
      this.words.push(wordArray)
    }

    for (let letter of this.paragraph) {
      this.letters.push(letter)
    }

    this.currentKey = this.letters[this.currentLetterIndex]

  }

  ngAfterViewInit() {
    this.letterElements.toArray()[0].nativeElement.className = "p currentKey"
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

