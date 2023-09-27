import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface keyEvent {
  text: string;
  type: string
}

@Injectable({ providedIn: 'root' })
export class KeyboardListenerService {
  private subject = new Subject<keyEvent>();

  setKey(event: KeyboardEvent) {
    this.subject.next({ text: event.key, type: event.type })
  }

  getCurrentKey(): Observable<any> {
    return this.subject.asObservable();
  }

}
