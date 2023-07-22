import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ColorModeService} from "../../services/color-mode.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  colorMode: boolean = true

  constructor(private service: ColorModeService) {
  }

  toggleColorMode(): void {
    this.colorMode = ! this.colorMode
    this.service.setColorMode(this.colorMode)
  }

  ngOnInit() {
    this.service.setColorMode(this.colorMode)
  }

}
