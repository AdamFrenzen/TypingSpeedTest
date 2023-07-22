import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class ColorModeService {
  colorMode: Subject<boolean> = new Subject();

  setColorMode(obj: boolean) {
    this.colorMode.next(obj);
  }

  getColorMode(): Observable<any> {
    return this.colorMode;
  }
}
