import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ColorModeService {
  subject: Subject<boolean> = new Subject();

  setColorMode(obj: boolean) {
    this.subject.next(obj);
  }

  getColorMode(): Observable<any> {
    return this.subject;
  }
}
