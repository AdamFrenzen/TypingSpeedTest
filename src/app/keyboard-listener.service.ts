import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeyboardListenerService {
  private subject = new Subject<any>();

  updateCurrentKey(key: string) {
    this.subject.next({ text: key });
  }

  getCurrentKey(): Observable<any> {
    return this.subject.asObservable();
  }
}
