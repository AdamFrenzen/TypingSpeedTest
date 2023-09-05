import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyboardListenerService {
  private subject = new Subject<any>();

  private timerState = new Subject<any>();

  private tracking: boolean = false;

  private totalChars: number = 0;
  private incorrectChars: number = 0;

  updateCurrentKey(key: string) {
    this.subject.next({ text: key });
  }
  getCurrentKey(): Observable<any> {
    return this.subject.asObservable();
  }

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
}
