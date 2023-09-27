import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

/*
* Component Communication Service
* trigger component's functions from another component
*/

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  private timerState = new Subject<any>();

  private tracking: boolean = false;

  private totalChars: number = 0;
  private incorrectChars: number = 0;

  private resetPromise = new Subject<boolean>();

  // WPM getter and setter for text component to calculate WPM
  checkTrackingWPM() {
    return this.tracking
  }
  setTrackingWPM(bool: boolean) {
    this.tracking = bool
  }
  // Accuracy tracking
  updateChars(total: number, incorrect: number) {
    this.totalChars = total;
    this.incorrectChars = incorrect
  }
  getChars() {
    return [this.totalChars, this.incorrectChars]
  }
  requestChangeTimerState(bool: boolean) {
    this.timerState.next(bool)
  }
  getTimerState() {
    return this.timerState.asObservable();
  }

  resetText() {
    return this.resetPromise.next(true)
  }
  getResetState() {
    return this.resetPromise.asObservable();
  }
}
