import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {KeyboardListenerService} from "../../services/keyboard-listener.service";
import {Subscription} from "rxjs";
import {CommunicatorService} from "../../services/communicator.service";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription

  constructor(private keyListener: KeyboardListenerService, private communicator: CommunicatorService) {
    this.subscription = this.keyListener.getCurrentKey().subscribe(key => {
      // backspace can be held down
      if (key.text === 'Backspace') {
        if (key.type === 'keydown') {
          return this.enterKey(key.text)
        }
        return
      }
      if (key.type === 'keyup') {
        return this.enterKey(key.text)
      }
    });
    // TODO: Add this to a subscription array
    this.communicator.getResetState().subscribe(state => {
      // TODO: This does not properly reset the text component
      this.resetText()
    })
  }

  paragraph: string =
    "console:"


  words: string[][] = []
  letters: string[] = []
  currentLetterIndex: number = 0
  currentKey: string = ""

  // for WPM and accuracy statistics
  totalChars = 0
  incorrectChars = 0

  @ViewChildren('letter')
  letterElements!: QueryList<ElementRef<HTMLElement>>

  initializeText() {

    this.words = []
    this.letters = []
    this.currentLetterIndex = 0
    this.currentKey = ""

    // for WPM and accuracy statistics
    this.totalChars = 0
    this.incorrectChars = 0

    for (let word of this.paragraph.split(' ')) {
      if (String(word) === "") { continue }
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
  resetText() {
    let letterElements: any[] = this.letterElements.toArray()

    letterElements.forEach(letter => {
      letter.nativeElement.className = "p blankKey"
    })

    this.currentLetterIndex = 0
    letterElements[0].nativeElement.className = 'p currentKey'
    this.initializeText()
  }

  enterKey(key: string) {
    if (key === "Space") {
      key = " "
    }
    if (key === "Shift") {
      return
    }

    this.communicator.requestChangeTimerState(true)
    // TODO: WPM TEST: WPM is calculated by (characters/5) / time
    // 100 characters in one minute = (100/5)=20, 20/1 = 20 WPM
    // 240 characters in 1.5 minute = (240/5)=48, 48/1.5 = 32 WPM
    // 300 characters in 3 minutes  = (300/5)=60, 60/3 = 20 WPM

    // IF calculatingWPM === true { totalChars++
    if (this.communicator.checkTrackingWPM()) {
      let letterElements: any[] = this.letterElements.toArray()
      // SUBTRACT FROM totalChars AND also SUBTRACT incorrect key IF (the class is incorrectKey)
      if (key === this.currentKey) {

        letterElements[this.currentLetterIndex + 1].nativeElement.className = "p currentKey"
        letterElements[this.currentLetterIndex].nativeElement.className = "p correctKey"
        this.currentLetterIndex++

        this.currentKey = this.letters[this.currentLetterIndex]

        this.totalChars += 1
        // console.log(this.totalChars)

      } else if ("Backspace" === key) {
          if (this.currentLetterIndex !== 0) {
            this.currentLetterIndex--
            this.currentKey = this.letters[this.currentLetterIndex]

            letterElements[this.currentLetterIndex + 1].nativeElement.className = "p blankKey"
            letterElements[this.currentLetterIndex].nativeElement.className = "p currentKey"

            this.totalChars--
            // CHECK FOR INCORRECT KEY HERE?
          }
      } else {
        letterElements[this.currentLetterIndex].nativeElement.className = "p incorrectKey"
        // TODO: USER OPTION: should users have multiple different settings for this?
        // removing the following 2 lines of code will result in the user
        // sticking on the incorrect key instead of passing.
        this.currentLetterIndex++
        this.currentKey = this.letters[this.currentLetterIndex]

        this.totalChars++
        this.incorrectChars++
      }
      this.communicator.updateChars(this.totalChars, this.incorrectChars)
      if (this.totalChars === this.paragraph.length) {
        console.log("reached end")
        this.communicator.requestChangeTimerState(false)
      }

    }
  }

  ngOnInit() {
    this.initializeText()
  }

  ngAfterViewInit() {
    // TODO: VISUALS: Re look over the class adding and removing. There is probably a better way.
    this.letterElements.toArray()[0].nativeElement.className = "p currentKey"
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

