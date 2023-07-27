import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {ColorModeService} from "../../services/color-mode.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Settings, SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorMode: boolean = true


  settingsForm = new FormGroup({
    showKeyboard: new FormControl(true),
    keyPressStyle: new FormControl('outline'),
    keyPressColor: new FormControl('#02c300'),
  });

  constructor(private service: ColorModeService, private modalService: NgbModal,
              private settingsService: SettingsService) {
  }

  openModal(modal: TemplateRef<HTMLElement>) {
    this.modalService.open(modal);
  }

  toggleColorMode(): void {
    this.colorMode = !this.colorMode
    this.service.setColorMode(this.colorMode)
  }

  ngOnInit() {
    this.service.setColorMode(this.colorMode)
    console.log(this.settingsForm.get("keyPressColor"))
  }

  onSubmit() {
    this.settingsService.setSettings(<Settings>this.settingsForm.value)
  }

}
