import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

export interface Settings {
  "showKeyboard": string | null | undefined,
  "keyPressStyle": string | null | undefined,
  "keyPressColor": string | null | undefined
}

@Injectable()
export class SettingsService {
  subject: Settings = {
    "showKeyboard": "",
    "keyPressStyle": "",
    "keyPressColor": ""
  };

  setSettings(obj: Settings) {
    this.subject = obj;
    console.log(this.getSettings())
  }

  getSettings(): Settings {
    return this.subject;
  }
}
